/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { VersionedTransaction } from "@solana/web3.js";
import getJupiterSwapQuote from "@/helpers/getJupiterSwapQuote";

const getAuraQuote = async (
  inputMint: string,
  outputMint: string,
  amount: string,
  slippage: number,
  publicKey: string,
  connection: any
) => {
  const slippageBps = slippage * 100;
  try {
    // const inputMint = "So11111111111111111111111111111111111111112";
    // const outputMint = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";
    // const amount = "1000000";

    const response = await axios.get(
      `https://backend-prod.auradex.xyz/api/v1/swap/compute/swap-base-in?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}&txVersion=V0`
    );
    const swapResponse = response.data;
    if (swapResponse.status) {
      const resTx = await axios.post(
        `https://backend-prod.auradex.xyz/api/v1/swap/transaction/swap-base-in`,
        {
          swapResponse,
          wallet: publicKey,
        }
      );
      const txData = resTx?.data;
      const { transaction } = txData.data[0];
      const tx = VersionedTransaction.deserialize(
        Buffer.from(transaction, "base64")
      );
      // const simulation = await connection.simulateTransaction(tx, {
      //   sigVerify: false,
      // });
      // if (simulation.value.err) {
      //   console.error(`simulation error`, simulation.value.err);
      //   return { error: "Simulation Error" };
      // }
      return { quote: swapResponse, tx: tx };
      // tx.sign([payer]);
      // const txId = await connection.sendTransaction(tx)
      // await connection.confirmTransaction({ signature: txId, ...(await connection.getLatestBlockhash()) });
      // console.log(`https://solscan.io/tx/${txId}`)
    } else {
      const jupiterResponse = await getJupiterSwapQuote({
        inputMint: inputMint,
        outputMint: outputMint,
        inputAmount: amount,
        slippage: slippageBps,
        publicKey: publicKey,
        connection: connection,
      });
      return jupiterResponse;
    }
  } catch (err) {
    console.error(err || "An error occurred");
    const jupiterResponse = await getJupiterSwapQuote({
      inputMint: inputMint,
      outputMint: outputMint,
      inputAmount: amount,
      slippage: slippageBps,
      publicKey: publicKey,
      connection: connection,
    });
    return jupiterResponse;

    // return { success: false, version: "V6", msg: "ROUTE_NOT_FOUND" };
  }
};

export default getAuraQuote;
