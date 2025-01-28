import db, { AccountData } from "./WalletDatabase";
import * as bip39 from "bip39";
import { Keypair, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import nacl from "tweetnacl";
import * as bs58 from "bs58";
import { cryptoDataType } from "./cryptoDataType";
import axios from "axios";
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import { COINGECKO_API_KEY, DEVNET, MAINNET } from "@/stores/Constants";
import { createTransferInstruction, getMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export class WalletManager {
  private static readonly SALT_BYTES = 16;
  private static readonly ITERATIONS = 100000;
  private static readonly KEY_LENGTH = 32;
  private static readonly IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  private static idleTimer: number | null = null;
  private static isLocked = true;
  private static currentAccountIndex = 0;
  private static connection = new Connection(
    DEVNET
  );

  static async clearData():Promise<void> {
    await Promise.all(
      db.tables.map(table => table.clear())
    );
  }

  static async createPin(pin: string): Promise<void> {
    if (!this.isValidPin(pin)) {
      throw new Error("Invalid PIN. Must be 6 digits.");
    }

    const { hashedPin, salt } = await this.hashPin(pin);

    // Store the hashed PIN and salt in IndexedDB
    await db.rootData.add({
      hashedPin,
      salt,
    });
    await db.walletData.add({
      walletName: "Default",
      encryptedSeedPhrase: "",
    });
  }

  static async hasPin(): Promise<boolean> {
    const rootData = await db.rootData.toArray();
    return rootData.length > 0;
  }

  static async hasSeedPhrase(): Promise<boolean> {
    const rootData = await db.rootData.toArray();
    const walletData = await db.walletData.toArray();
    return rootData.length > 0 && walletData[0].encryptedSeedPhrase !== "";
  }

  static async verifyPin(pin: string): Promise<boolean> {
    const rootData = await db.rootData.toArray();
    if (rootData.length === 0) {
      throw new Error("No PIN set. Please create a PIN first.");
    }

    const { hashedPin, salt } = rootData[0];
    const computedHash = await this.hashPin(pin, salt);

    return computedHash.hashedPin === hashedPin;
  }

  static async changePin(oldPin: string, newPin: string): Promise<void> {
    if(oldPin === newPin) {
      throw new Error("Enter a different PIN sequence");
    }

    if (!(await this.verifyPin(oldPin))) {
      throw new Error("Incorrect old PIN");
    }

    if (!this.isValidPin(newPin)) {
      throw new Error("Invalid new PIN. Must be 6 digits.");
    }

    const { hashedPin, salt } = await this.hashPin(newPin);

    // Update the hashed PIN and salt in IndexedDB
    const rootData = await db.rootData.toArray();
    const walletData = await db.walletData.toArray();
    const accounts = await db.accounts.toArray();
    const oldHashedPin = rootData[0].hashedPin;
    walletData.map(async (wallet) => {
      const seedPhrase = await this.decryptData(wallet.encryptedSeedPhrase, oldHashedPin);
      const encryptedSeedPhrase = await this.encryptData(seedPhrase, hashedPin);
      await db.walletData.update(wallet.id, {encryptedSeedPhrase});
    });

    accounts.map(async (account) => {
      const privateKey = await this.decryptData(account.encryptedPrivateKey, oldHashedPin);
      const encryptedPrivateKey = await this.encryptData(privateKey, hashedPin);
      await db.accounts.update(account.id, {encryptedPrivateKey});
    });
    
    if (rootData.length > 0) {
      await db.rootData.update(rootData[0].id!, { hashedPin, salt });
    } else {
      throw new Error("No existing wallet data found.");
    }
  }

  static async unlockWallet(pin: string): Promise<void> {
    if (await this.verifyPin(pin)) {
      this.isLocked = false;
      this.resetIdleTimer();
    } else {
      throw new Error("Incorrect PIN");
    }
  }

  static lockWallet(): void {
    this.isLocked = true;
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  static isWalletLocked(): boolean {
    return this.isLocked;
  }

  static async encryptData(data: string, pin: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const pinBuffer = encoder.encode(pin);

    const key = await crypto.subtle.importKey(
      "raw",
      pinBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const derivedBits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
      key,
      256
    );

    const encryptionKey = await crypto.subtle.importKey(
      "raw",
      derivedBits,
      { name: "AES-GCM" },
      false,
      ["encrypt"]
    );
    const encryptedContent = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      encryptionKey,
      dataBuffer
    );

    const encryptedArray = new Uint8Array(encryptedContent);
    const resultArray = new Uint8Array(
      salt.length + iv.length + encryptedArray.length
    );
    resultArray.set(salt, 0);
    resultArray.set(iv, salt.length);
    resultArray.set(encryptedArray, salt.length + iv.length);

    return btoa(String.fromCharCode(...new Uint8Array(resultArray)));
  }

  static async decryptData(
    encryptedData: string,
    pin: string
  ): Promise<string> {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const pinBuffer = encoder.encode(pin);

    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split("")
        .map((char) => char.charCodeAt(0))
    );
    const salt = encryptedArray.slice(0, 16);
    const iv = encryptedArray.slice(16, 28);
    const data = encryptedArray.slice(28);

    const key = await crypto.subtle.importKey(
      "raw",
      pinBuffer,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    
    const derivedBits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: salt, iterations: 100000, hash: "SHA-256" },
      key,
      256
    );
    

    const decryptionKey = await crypto.subtle.importKey(
      "raw",
      derivedBits,
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    
    const decryptedContent = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      decryptionKey,
      data
    );
    

    return decoder.decode(decryptedContent);
  }

  private static isValidPin(pin: string): boolean {
    return /^\d{6}$/.test(pin);
  }

  private static async hashPin(
    pin: string,
    existingSalt?: string
  ): Promise<{ hashedPin: string; salt: string }> {
    const encoder = new TextEncoder();
    const salt = existingSalt
      ? new Uint8Array(
          existingSalt.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
        )
      : crypto.getRandomValues(new Uint8Array(this.SALT_BYTES));
    const pinData = encoder.encode(pin);

    const importedKey = await crypto.subtle.importKey(
      "raw",
      pinData,
      { name: "PBKDF2" },
      false,
      ["deriveBits"]
    );
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: this.ITERATIONS,
        hash: "SHA-256",
      },
      importedKey,
      this.KEY_LENGTH * 8
    );

    const hashedPin = Array.from(new Uint8Array(derivedBits))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const saltString = Array.from(salt)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return { hashedPin, salt: saltString };
  }

  private static resetIdleTimer(): void {
    if (this.idleTimer !== null) {
      clearTimeout(this.idleTimer);
    }
    this.idleTimer = window.setTimeout(
      () => this.lockWallet(),
      this.IDLE_TIMEOUT
    );
  }

  // Call this method when there's user activity
  static onUserActivity(): void {
    if (!this.isLocked) {
      this.resetIdleTimer();
    }
  }

  static async createSeedPhrase(): Promise<{phrase:string, account:AccountData}> {
    try {
      console.log("Starting seed phrase creation");
      const entropy = nacl.randomBytes(16);
      console.log("Entropy created");
      const mnemonic = bip39.entropyToMnemonic(
        Buffer.from(entropy).toString("hex")
      );
      console.log("Mnemonic generated");
      await this.storeSeedPhrase(mnemonic);
      console.log("Seed phrase stored");
      const account = await this.createFirstAccount();
      console.log("First account created");
      return {phrase: mnemonic, account};
    } catch (error) {
      console.error("Error in createSeedPhrase:", error);
      throw error;
    }
  }
  static async storeSeedPhrase(seedPhrase: string): Promise<void> {
    try {
      console.log("Starting seed phrase storage");
      if (this.isLocked) {
        throw new Error("Wallet is locked. Please unlock first.");
      }

      const walletData = await db.walletData.toArray();
      const rootData = await db.rootData.toArray();
      if (walletData.length === 0) {
        throw new Error("No wallet data found. Please set up a PIN first.");
      }

      const encryptedSeedPhrase = await this.encryptData(
        seedPhrase,
        rootData[0].hashedPin
      );
      await db.walletData.update(walletData[0].id!, { encryptedSeedPhrase });
      console.log("Seed phrase stored successfully");
    } catch (error) {
      console.error("Error in storeSeedPhrase:", error);
      throw error;
    }
  }

  static async createFirstAccount(): Promise<AccountData> {
    try {
      console.log("Starting first account creation");
      if (this.isLocked) {
        throw new Error("Wallet is locked. Please unlock first.");
      }
      const walletData = await db.walletData.toArray();
      if (!walletData[0]?.id) {
        throw new Error("No wallet data found");
      }
      const seedPhrase = await this.getSeedPhraseById(walletData[0].id);
      console.log("Seed phrase retrieved");
      const seed = await bip39.mnemonicToSeed(seedPhrase);
      console.log("Seed generated from mnemonic");

      // Use the seed to create a keypair
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      console.log("Keypair created");

      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");

      const account = await this.storeAccount(publicKey, privateKey);
      console.log("@@@@@@First account stored");

      return account;
    } catch (error) {
      console.error("Error in createFirstAccount:", error);
      throw error;
    }
  }

  static async createAccount(): Promise<string> {
    try {
      console.log("Starting new account creation");
      if (this.isLocked) {
        throw new Error("Wallet is locked. Please unlock first.");
      }

      const walletData = await db.walletData.toArray();
      if (!walletData[0]?.id) {
        throw new Error("No wallet data found");
      }
      const seedPhrase = await this.getSeedPhraseById(walletData[0].id);
      console.log("Seed phrase retrieved");
      const seed = await bip39.mnemonicToSeed(seedPhrase);
      console.log("Seed generated from mnemonic");

      // Increment the account index
      this.currentAccountIndex++;

      // Use a unique seed for each account
      const uniqueSeed = nacl.hash(
        Buffer.concat([seed, Buffer.from(this.currentAccountIndex.toString())])
      );

      // Use the unique seed to create a keypair
      const keypair = Keypair.fromSeed(uniqueSeed.slice(0, 32));
      console.log(
        "Keypair created for account index:",
        this.currentAccountIndex
      );

      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");

      await this.storeAccount(publicKey, privateKey);
      console.log("@@@@@New account stored");

      return publicKey;
    } catch (error) {
      console.error("Error in createAccount:", error);
      throw error;
    }
  }

  static async storeAccount(
    publicKey: string,
    privateKey: string,
    accountName?:string,
    walletId?:number
  ): Promise<AccountData> {
    // if (this.isLocked) {
    //   throw new Error("Wallet is locked. Please unlock first.");
    // }

    const rootData = await db.rootData.toArray();
    const walletData = await db.walletData.toArray();
    if (walletData.length === 0) {
      throw new Error("No wallet data found. Please set up a PIN first.");
    }

    const encryptedPrivateKey = await this.encryptData(
      privateKey,
      rootData[0].hashedPin
    );
    if(!accountName) {
      const account:AccountData = {publicKey, encryptedPrivateKey, accountName: "No name", walletId: walletId? walletId: walletData[0].id}
      await db.accounts.add(account);
      return account;
    }  
    else {
      const account:AccountData = { publicKey, encryptedPrivateKey, accountName, walletId: walletId? walletId: walletData[0].id }
      await db.accounts.add(account);
return account
    }
  }

  static async createWallet(walletName:string): Promise<AccountData> {
    try {
      const keypair = Keypair.generate();
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");
      const account:AccountData = await this.storeAccount(publicKey, privateKey, walletName);
      console.log("@@@@@wallet created and stored");
  
      return account;
    } catch (error) {
      console.error("Error in createAccount:", error);
      throw error;
    }
  }

  static async exportAccountPrivateKey(publicKey: string): Promise<string> {
    // if (this.isLocked) {
    //   throw new Error("Wallet is locked. Please unlock first.");
    // }

    const account = await db.accounts.where({ publicKey }).first();
    
    if (!account) {
      throw new Error("Account not found.");
    }

    const walletData = await db.walletData.toArray();
    const rootData = await db.rootData.toArray();
    if (walletData.length === 0) {
      throw new Error("No wallet data found. Please set up a PIN first.");
    }

    return await this.decryptData(
      account.encryptedPrivateKey || '',
      rootData[0].hashedPin
    );
  }

  static async getSeedPhraseById(id: number): Promise<string> {
    // if (this.isLocked) {
    //   throw new Error("Wallet is locked. Please unlock first.");
    // }

    const walletData = await db.walletData.where({id}).first ();
    const rootData = await db.rootData.toArray();
    if (!walletData || !walletData.encryptedSeedPhrase) {
      throw new Error("No seed phrase found.");
    }

    return this.decryptData(
      walletData.encryptedSeedPhrase,
      rootData[0].hashedPin
    );
  }

  static async getAccounts(): Promise<{publicKey:string, accountName:string, id:number, walletId:number, avatar:string, encryptedPrivateKey:string}[]> {
    // if (this.isLocked) {
    //   throw new Error("Wallet is locked. Please unlock first.");
    // }
    const accounts = await db.accounts.toArray();
    return accounts.map((account) => {
      return {
        publicKey: account.publicKey || '',
        accountName: account.accountName || '',
        id: account.id || 0,
        walletId: account.walletId || 0,
        avatar: account.avatar || '',
        encryptedPrivateKey: account.encryptedPrivateKey || ''
      };
    });
  }

  static async getWalletsAndAccounts(): Promise<{id: number, walletName: string, totalBalance: string, accounts: {id: string, name: string, publicKey: string, avatar: string}[]}[]> {
    const allAccounts = await this.getAccounts(); 
    const wallets = await db.walletData.toArray();
    return wallets.map((wallet) => {
      if (!wallet.id || !wallet.walletName) {
        throw new Error("Invalid wallet data");
      }
      const accounts = allAccounts
        .filter(account => account.walletId === wallet.id)
        .map(account => ({
          id: account.id.toString(),
          name: account.accountName,
          publicKey: account.publicKey,
          avatar: account.avatar
        }));
        return {
          id: wallet.id,
          walletName: wallet.walletName,
          totalBalance: "0", // Since totalBalance doesn't exist on WalletData
          accounts: accounts
        };
      })
  } 

  static async signTransaction(
    publicKey: string,
    transaction: Uint8Array
  ): Promise<Uint8Array> {
    if (this.isLocked) {
      throw new Error("Wallet is locked. Please unlock first.");
    }

    const privateKey = await this.exportAccountPrivateKey(publicKey);
    const keypair = Keypair.fromSecretKey(
      new Uint8Array(Buffer.from(privateKey, "hex"))
    );
    return nacl.sign.detached(transaction, keypair.secretKey);
  }

  static async getWalletFromSeed(seedPhrase: string): Promise<string> {
    try {
      console.log(seedPhrase);
      if (!bip39.validateMnemonic(seedPhrase)) throw "Invalid Seed!";

      const seed = bip39.mnemonicToSeedSync(seedPhrase, "");
      const keypair = Keypair.fromSeed(seed.slice(0, 32));
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");

      const accounts = await this.getAccounts();
      let exitIndex: number = -1;
      accounts.map((account) => account.publicKey).forEach((account: string, index: number) => {
        if (account === publicKey) {
          exitIndex = index;
          return;
        }
      });

      if (exitIndex === -1) await this.storeAccount(publicKey, privateKey, "No name");
      return publicKey;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getWalletFromPrivateKey(Key: string): Promise<string> {
    try {
      const keypair = Keypair.fromSecretKey(bs58.default.decode(Key));
      const publicKey = keypair.publicKey.toBase58();
      const privateKey = Buffer.from(keypair.secretKey).toString("hex");

      const accounts = await this.getAccounts();
      let exitIndex: number = -1;
      accounts.map((account) => account.publicKey).forEach((account: string, index: number) => {
        if (account === publicKey) {
          exitIndex = index;
          return;
        }
      });

      if (exitIndex === -1) await this.storeAccount(publicKey, privateKey, "No name");
      console.log("New account stored");
      return publicKey;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getBalance(publicKey: string): Promise<number> {
    try {
      const pubKey = new PublicKey(publicKey);
      const balance = await this.connection.getBalance(pubKey);
      console.log(balance / LAMPORTS_PER_SOL);

      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAccountsByWalletId (walletId: number): Promise<{publicKey:string, accountName:string, id:number, walletId:number, avatar:string, encryptedPrivateKey:string}[]> {
    const accounts = await db.accounts.where({ walletId }).toArray();
    return accounts.map((account) => {return {
      publicKey: account.publicKey || '',
      accountName: account.accountName || '',
      id: account.id || 0,
      walletId: account.walletId || 0,
      avatar: account.avatar || '',
      encryptedPrivateKey: account.encryptedPrivateKey || ''
    }});
  }

  static async getWalletById(walletId: number): Promise<{id: number, walletName: string}> {
    const wallet = await db.walletData.where({ id: walletId }).first();
    if (!wallet) {
      return { id: 0, walletName: '' };
    }
    return { 
      id: wallet.id || 0,
      walletName: wallet.walletName || ''
    };
  }

  static async getTokenPrices(mintAddresses: string[]) {
    const endpoint = `https://pro-api.coingecko.com/api/v3/onchain/networks/solana/tokens/multi/${mintAddresses.join(
      "%2C"
    )}`;
    const headers = {
      accept: "application/json",
      "x-cg-pro-api-key": COINGECKO_API_KEY,
    };

    const url = `https://pro-api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${mintAddresses.join(
      "%2C"
    )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

    try {
      const response = await axios.get(endpoint, { headers });
      const response1 = await axios.get(url, { headers });
      const prices: {
        attributes: {
          symbol: string;
          image_url: string;
          price_usd: number;
          address: string;
        };
      }[] = response.data.data;
      const change: Record<string, { usd_24h_change: number }> = response1.data;

      // Map prices to mint addresses
      const priceMap: Record<string, number> = {};
      const ticker: Record<string, string> = {};
      const image: Record<string, string> = {};
      prices.map((item) => {
        priceMap[item.attributes.address] = item.attributes.price_usd;
        ticker[item.attributes.address] = item.attributes.symbol;
        image[item.attributes.address] = item.attributes.image_url;
      });

      return { priceMap, ticker, image, change };
    } catch (error) {
      console.error("Error fetching prices:", (error as Error).message);
      throw error;
    }
  }

  static isValidWalletAddress(input: string): boolean {
    try {
      new PublicKey(input); // If this doesn't throw, it's valid
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async getWalletAddressFromDomain(input:string): Promise<string | null> {
    try {

        if (this.isValidWalletAddress(input)) {
          return input; // Directly return if it's a valid wallet address
        }

        // Get the domain key
        const { pubkey } = await getDomainKey(input);

        // Fetch the registry data
        const registry = await NameRegistryState.retrieve(this.connection, pubkey);

        if (registry && registry.registry.owner) {
            return registry.registry.owner.toBase58();
        } else {
            console.error("No owner found for this domain");
            return null;
        }
    } catch (error) {
        console.error("Error resolving domain:", error);
        return null;
    }
}

  static async getTokenList(publicKey: string): Promise<cryptoDataType[]> {
    const pubKey = new PublicKey(publicKey);
    const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
      pubKey,
      {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      }
    );
    // Extract token balances
    const tokens = tokenAccounts.value
      .filter(({ account }) => {
        return account.data.parsed.info.tokenAmount.uiAmount > 0;
      })
      .map(({ pubkey, account }) => {
        const data = account.data.parsed.info;
        return {
          tokenAccount: pubkey.toString(),
          mint: data.mint as string,
          balance: parseFloat(data.tokenAmount.uiAmount || "0"), // Human-readable balance
        };
      });

    const mintAddresses = tokens.map((token) => token.mint);
    const tokenDetail = (await this.getTokenPrices(mintAddresses)) as {
      priceMap: Record<string, number>;
      ticker: Record<string, string>;
      image: Record<string, string>;
      change: Record<string, { usd_24h_change: number }>;
    };

    // Add USD price and USD balance to tokens
    const tokensWithUSD = tokens.map((token, index) =>
      index < 9
        ? {
            ...token,
            usdPrice: tokenDetail.priceMap[token.mint] || 0,
            priceChange: tokenDetail.change[token.mint]?.usd_24h_change || 0,
            usdBalance: (tokenDetail.priceMap[token.mint] || 0) * token.balance,
            ticker: tokenDetail.ticker[token.mint] || "",
            image: tokenDetail.image[token.mint] || "",
            flag: true,
          }
        : {
            ...token,
            usdPrice: tokenDetail.priceMap[token.mint] || 0,
            priceChange: tokenDetail.change[token.mint]?.usd_24h_change || 0,
            usdBalance: (tokenDetail.priceMap[token.mint] || 0) * token.balance,
            ticker: tokenDetail.ticker[token.mint] || "",
            image: tokenDetail.image[token.mint] || "",
            flag: false,
          }
    );

    return tokensWithUSD;
  }

  static async sendSol(from: string, to:string, amount:number):Promise<string> {
    const privateKey = await this.exportAccountPrivateKey(from);

    console.log("privateKey: ", privateKey, '\n');

    
    const keypair = Keypair.fromSecretKey(
      new Uint8Array(Buffer.from(privateKey, "hex"))
    );

    console.log("publicKey: ", keypair.publicKey.toBase58(), '\n privateKey: ', Buffer.from(keypair.secretKey).toString("hex"));
    

    const transaction = new Transaction().add(
      SystemProgram.transfer({
          fromPubkey: keypair.publicKey,
          toPubkey: new PublicKey(to),
          lamports: LAMPORTS_PER_SOL * amount,
      }),
    );
    const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [keypair],
    );
    return signature;
  }

  static async sendToken(from:string, to:string, token:string, amount:number):Promise<string> {
    const privateKey = await this.exportAccountPrivateKey(from);
    const keypair = Keypair.fromSecretKey(
      new Uint8Array(Buffer.from(privateKey, "hex"))
    );
    const mintPubkey = new PublicKey(token);  // Replace with actual token mint address

    const sourceAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        keypair,
        mintPubkey,
        keypair.publicKey
    );

    const destinationAccount = await getOrCreateAssociatedTokenAccount(
      this.connection,
      keypair,
      mintPubkey,
      new PublicKey(to)
    );

    const mintInfo = await getMint(this.connection, mintPubkey);
    const tx = new Transaction();
    tx.add(createTransferInstruction(
        sourceAccount.address,
        destinationAccount.address,
        keypair.publicKey,
        amount === 0 ? 1: amount * Math.pow(10, mintInfo.decimals)
    ))

    const latestBlockHash = await this.connection.getLatestBlockhash('confirmed');
    tx.recentBlockhash = await latestBlockHash.blockhash;
    const signature = await sendAndConfirmTransaction(this.connection, tx, [keypair]);
    return signature
  }

  static async editWalletName(walletId: number, newName: string): Promise<void> {
    await db.walletData.update(walletId, { walletName: newName });
  } 

  static async editAccountName(accountId: number, newName: string): Promise<void> {
    await db.accounts.update(accountId, { accountName: newName });
  } 

  static async updateAccountAvatar(accountId: number, avatarUrl: string): Promise<void> {
    await db.accounts.update(accountId, { avatar: avatarUrl });
  }

  static async getNFTs(walletAddress: string):Promise<[]> {
    const response = await fetch(MAINNET, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": "text",
          "method": "getAssetsByOwner",
          "params": {
              "ownerAddress": walletAddress
          }
      }),
  });
  const data = await response.json();
  return data.result.items
  }

  static deriveSeedFromPath(seed: Buffer, path: string) {
    const hardenedOffset = 0x80000000; // Hardened offset for BIP32
    const parts = path
        .split('/')
        .slice(1)
        .map((p) => {
            const hardened = p.endsWith("'");
            return parseInt(p.replace("'", ""), 10) + (hardened ? hardenedOffset : 0);
        });
  
    return parts.reduce<{key: Uint8Array<ArrayBuffer>, chainCode: Uint8Array<ArrayBuffer>}>(
        ({ key, chainCode }: {key: Uint8Array<ArrayBuffer>, chainCode: Uint8Array<ArrayBuffer>}, part: number) => {
            const buffer = Buffer.concat([
                Buffer.allocUnsafe(4), // Space for part
                Buffer.from(key), // Existing key
                Buffer.from(chainCode), // Chain code
            ]);
  
            buffer.writeUInt32BE(part, 0); // Write part at the beginning
  
            const data = nacl.hash(buffer);
            return {
                key: data.slice(0, 32),
                chainCode: data.slice(32),
            };
        },
        { key: seed.slice(0, 32), chainCode: seed.slice(32) },
    );
  };

  static async addAccount(accountName:string, walletId: number):Promise<AccountData> {
    const seedPhrase = await this.getSeedPhraseById(walletId);
    const seed = await bip39.mnemonicToSeed(seedPhrase);

    // Derive the private key using Solana's derivation path
    const path =  `m/44'/501'/${(await db.accounts.toArray()).length.toString()}'/0'`;
    const { key } = this.deriveSeedFromPath(seed, path);

    // Generate the keypair
    const keypair = Keypair.fromSeed(key.slice(0, 32));
    const publicKey = keypair.publicKey.toBase58();
    const privateKey = Buffer.from(keypair.secretKey).toString("hex");
    const account = await this.storeAccount(publicKey, privateKey, accountName, walletId);
    return account;
  }
}

