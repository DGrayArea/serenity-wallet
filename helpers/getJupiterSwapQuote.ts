/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getJupiterTransaction } from "./getJupiterTransaction";

async function getJupiterSwapQuote({
  inputMint,
  outputMint,
  inputAmount,
  slippage,
  publicKey,
  connection,
}: any) {
  try {
    const response = await axios.get("https://quote-api.jup.ag/v6/quote", {
      params: {
        inputMint,
        outputMint,
        amount: inputAmount.toString(),
        slippageBps: slippage.toString(),
        feeBps: "4",
        onlyDirectRoutes: "true",
      },
      headers: {
        Accept: "application/json",
      },
    });
    if (response.data) {
      const tx = await getJupiterTransaction({
        quoteResponse: response.data,
        userPublicKey: publicKey,
        connection: connection,
      });
      console.log("Get Jup tx");
      return { quote: response.data, tx: tx };
    } else {
      return { success: false, version: "V6", msg: "ROUTE_NOT_FOUND" };
    }
  } catch (error) {
    console.error("Swap quote error:", error);
    return { success: false, version: "V6", msg: "ROUTE_NOT_FOUND" };
  }
}

export default getJupiterSwapQuote;
