import { ArrowLeft, AlertCircle, CircleHelp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import SwapSubmittingModal from "../components/SwapSubmittingModal";
import { useCallback, useMemo, useState } from "react";
import SwapSuccessScreen from "../components/SwapSuccessScreen";
import { useQuote, useSwapToken, useTransaction } from "@/hooks/useCollections";
import { Connection } from "@solana/web3.js";
import { useWalletStore } from "@/stores/walletStore";

export default function SwapConfirmation() {
  const { quote } = useQuote();
  const { fromToken, toToken } = useSwapToken();
  const { selectedAccount } = useWalletStore();
  const { tx } = useTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { slippageTolerance } = location.state;

  const connection = useMemo(
    () => new Connection(import.meta.env.VITE_MAINNET),
    []
  );

  const handleConfirmSwap = useCallback(async () => {
    setIsSubmitting(true);

    // const transaction = tx.transaction
    // //decrypt private key and sign transaction here.
    // transaction.sign([selectedAccount.encryptedPrivateKey]);

    // const latestBlockHash = await connection.getLatestBlockhash();
    // const rawTransaction = transaction.serialize()
    // const txid = await connection.sendRawTransaction(rawTransaction, {
    //   skipPreflight: true,
    //   maxRetries: 2
    // });
    // await connection.confirmTransaction({
    //  blockhash: latestBlockHash.blockhash,
    //  lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //  signature: txid
    // });
    // console.log(`https://solscan.io/tx/${txid}`);
    setIsSubmitting(false);
    setIsSuccess(true);
  }, [tx, connection, selectedAccount]);

  if (isSuccess) {
    return (
      <SwapSuccessScreen
        payAmount={
          Number(quote?.inAmount) / Number(10 ** Number(fromToken?.decimals))
        }
        paySymbol={fromToken?.symbol}
        receiveAmount={
          Number(quote?.outAmount) / Number(10 ** Number(toToken?.decimals))
        }
        receiveSymbol={toToken?.symbol}
      />
    );
  }

  if (isSubmitting) {
    return (
      <SwapSubmittingModal
        payAmount={
          Number(quote?.inAmount) / Number(10 ** Number(fromToken?.decimals))
        }
        paySymbol={fromToken?.symbol}
        receiveAmount={
          Number(quote?.outAmount) / Number(10 ** Number(toToken?.decimals))
        }
        receiveSymbol={toToken?.symbol}
      />
    );
  }

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm">Swap</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4">
        <div className="bg-[#171121]/90 backdrop-blur-xl rounded-2xl p-6 border border-[#8884FF]/20">
          <div className="text-center mb-6">
            <p className="text-main-100 text-sm mb-4">You're going to swap</p>
            <div className="flex items-center justify-center gap-2 mb-3">
              {fromToken?.logo ? (
                <>
                  <img
                    src={fromToken?.logo}
                    alt={fromToken?.symbol}
                    className="w-7 h-7"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parent = img.parentNode as HTMLElement;
                      const fallback = parent.querySelector(".acronym");
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                  <div className="acronym hidden">
                    <CircleHelp className="w-7 h-7 text-white" />
                  </div>
                </>
              ) : (
                <div className="acronym">
                  <CircleHelp className="w-10 h-9 text-white" />
                </div>
              )}
              <span className="text-white text-lg font-medium">
                {Number(quote?.inAmount) /
                  Number(10 ** Number(fromToken?.decimals))}{" "}
                {fromToken?.symbol}
              </span>
            </div>
            <div className="text-white/60 text-xl my-1">↓</div>
            <div className="flex items-center justify-center gap-2">
              {toToken?.logo ? (
                <>
                  <img
                    src={toToken?.logo}
                    alt={toToken?.symbol}
                    className="w-7 h-7"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const parent = img.parentNode as HTMLElement;
                      const fallback = parent.querySelector(".acronym");
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                  <div className="acronym hidden">
                    <CircleHelp className="w-7 h-7 text-white" />
                  </div>
                </>
              ) : (
                <div className="acronym">
                  <CircleHelp className="w-10 h-9 text-white" />
                </div>
              )}
              <span className="text-white text-lg font-medium">
                {Number(quote?.outAmount) /
                  Number(10 ** Number(toToken?.decimals))}{" "}
                {toToken?.symbol}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm border-t border-white/10 pt-4 text-white">
            <div className="flex flex-col">
              <div className="text-main-100">From</div>
              <div>1stWallet! (hs3y4...7et36g)</div>
            </div>
            <hr className="border-white/10" />
            <div className="flex flex-col">
              <div className="text-main-100">Best Price</div>
              <div>
                1 {fromToken?.symbol} ={" "}
                {Number(quote?.outAmount) /
                  Number(10 ** Number(toToken?.decimals)) /
                  Number(quote?.inAmount) /
                  Number(10 ** Number(fromToken?.decimals))}{" "}
                {toToken?.symbol}
              </div>
            </div>
            <hr className="border-white/10" />
            <div className="flex flex-col">
              <div className="text-main-100">Slippage Tolerance</div>
              <div>{Number(quote?.slippageBps) / 100}%</div>
            </div>
            <hr className="border-white/10" />
            <div className="flex flex-col">
              <div className="text-main-100">Est. Time</div>
              <div className="">{quote?.timeTaken}</div>
            </div>

            <div className="flex items-center text-main-200 text-xs mt-2 rounded-lg">
              <AlertCircle className="w-4 h-4 mr-2 " />
              Quote includes a 0.85% SOL fee
            </div>
          </div>
        </div>
        <button
          className="w-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] px-4 text-white py-3.5 rounded-full mt-6 text-base font-medium"
          onClick={handleConfirmSwap}
        >
          Confirm Swap
        </button>
      </div>
    </div>
  );
}
