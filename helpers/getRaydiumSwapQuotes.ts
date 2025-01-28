/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

async function getRaydiumSwapQuote({
  inputMint,
  outputMint,
  inputAmount,
  slippage = 0.5,
}: any) {
  try {
    const response = await axios.get("https://quote-api.raydium.io/v2/quote", {
      params: {
        inputMint,
        outputMint,
        amount: inputAmount.toString(),
        slippage: slippage.toString(),
        onlyDirectRoute: "true",
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "http://localhost:5173",
        Referer: "http://localhost:5173/",
      },
    });

    const { data } = response;

    return data;
  } catch (error) {
    console.error("Swap quote error:", error);
    throw error;
  }
}

export default getRaydiumSwapQuote;
