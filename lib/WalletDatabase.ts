import Dexie from 'dexie';

export interface RootData {
  id?: number;
  hashedPin: string;
  salt: string;
}

export interface AccountData {
  id?: number;
  publicKey?: string;
  encryptedPrivateKey?: string;
  accountName?: string;
  avatar?: string | null;
  walletId?: number;
}

export interface WalletData {
  id?: number;
  walletName?: string;
  encryptedSeedPhrase: string;
}
export class WalletDatabase extends Dexie {
  rootData!: Dexie.Table<RootData, number>;
  accounts!: Dexie.Table<AccountData, number>;
  walletData!: Dexie.Table<WalletData, number>;
  constructor() {
    super('WalletDatabase');
    this.version(2).stores({
      rootData: '++id, hashedPin, salt',
      accounts: '++id, publicKey, accountName, avatar, walletId, encryptedPrivateKey',
      walletData: '++id, walletName, encryptedSeedPhrase'
    });
  }
}

const db = new WalletDatabase();
export default db;
