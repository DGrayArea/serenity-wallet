/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Connection, VersionedTransaction } from "@solana/web3.js";

async function getJupiterTransaction({
  quoteResponse,
  userPublicKey,
  connection,
}: {
  quoteResponse: any;
  userPublicKey: string;
  connection: Connection;
}) {
  try {
    const response = await axios.post("https://quote-api.jup.ag/v6/swap", {
      quoteResponse,
      userPublicKey,
      wrapUnwrapSOL: true,
    });

    const { swapTransaction } = response.data;

    // Deserialize the transaction
    const serializedTransaction = Buffer.from(swapTransaction, "base64");
    const transaction = VersionedTransaction.deserialize(serializedTransaction);

    // Get the latest blockhash
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    return {
      transaction,
      blockhash,
      lastValidBlockHeight,
    };
  } catch (error) {
    console.log(error);
    return { success: false, version: "V6", msg: "ROUTE_NOT_FOUND" };
  }
}
export { getJupiterTransaction };
