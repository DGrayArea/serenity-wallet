import {
  Connection,
  PublicKey,
  Transaction,
  Keypair,
  clusterApiUrl,
} from "@solana/web3.js";
import axios from "axios";

const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
const STAKE_POOL_ADDRESS = new PublicKey("StakePoolAddressHere");
const VALIDATOR_ADDRESS = new PublicKey("ValidatorAddressHere");
const userKeypair = Keypair.generate();

const checkSolBalance = async (walletAddress: PublicKey) => {
  const balance = await connection.getBalance(walletAddress);
  console.log(`Wallet balance: ${balance / 1e9} SOL`);
};

const getStakedSolDetails = async (stakePoolAddress: PublicKey) => {
  try {
    const response = await axios.get(
      `https://api.stakepool.example.com/stakes/${stakePoolAddress.toBase58()}`
    );
    console.log("Staked SOL Details:", response.data);
  } catch (error) {
    console.error("Error fetching staked SOL details:", error);
  }
};

const getStakingAPY = async () => {
  try {
    const response = await axios.get("https://api.stakepool.example.com/apy");
    console.log(`Current APY: ${response.data.apy}%`);
  } catch (error) {
    console.error("Error fetching APY:", error);
  }
};

const stakeSol = async (amount: number, validatorAddress: PublicKey) => {
  try {
    const transaction = new Transaction();
    transaction.feePayer = userKeypair.publicKey;
    const signedTransaction = await connection.sendTransaction(transaction, [
      userKeypair,
    ]);

    console.log("Staking transaction sent:", signedTransaction);
    await connection.confirmTransaction(signedTransaction);
    console.log("Staking transaction confirmed");
  } catch (error) {
    console.error("Error staking SOL:", error);
  }
};

const main = async () => {
  await checkSolBalance(userKeypair.publicKey);
  await getStakedSolDetails(STAKE_POOL_ADDRESS);
  await getStakingAPY();
  await stakeSol(1, VALIDATOR_ADDRESS);
};

main().catch((err) => console.error(err));
