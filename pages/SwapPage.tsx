import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import swapIcon from "../assets/Swap2.svg";
import CustomSlippageDialog from "../components/CustomSlippageDialog";
import getJupiterSwapQuote from "@/helpers/getJupiterSwapQuote";
// import getRaydiumSwapQuote from "@/helpers/getRaydiumSwapQuotes";
// import { swap } from "../lib/swap";
import { TokenDrawer } from "@/components/TokenDrawer";
import { useQuote, useSwapToken, useTransaction } from "@/hooks/useCollections";
import theme from "@/config/theme";
import { useWalletStore } from "@/stores/walletStore";
import getAuraQuote from "@/hooks/useSwap";
import { Connection } from "@solana/web3.js";
import { useToast } from "@/hooks/use-toast";
// import { getJupiterTransaction } from "@/helpers/getJupiterTransaction";

interface TokenInfo {
  symbol: string;
  balance: number;
  icon?: string;
}

export default function SwapPage() {
  const navigate = useNavigate();
  const { selectedAccount } = useWalletStore();
  const { fromToken, toToken, setFrom, setTo } = useSwapToken();
  const { quote, setQuote } = useQuote();
  const { setTx } = useTransaction();
  const { toast } = useToast();
  const [slippageTolerance, setSlippageTolerance] = useState(0.5);
  // const [customSlippage, setCustomSlippage] = useState(0);
  const [payAmount, setPayAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  // const [showPreview, setShowPreview] = useState(false);
  const [showSlippageDialog, setShowSlippageDialog] = useState(false);
  const connection = useMemo(
    () => new Connection(import.meta.env.VITE_MAINNET),
    []
  );

  const payToken: TokenInfo = {
    symbol: "MUMU",
    icon: "/src/assets/MumuIcon.svg",
    balance: 0,
  };

  const receiveToken: TokenInfo = {
    symbol: "SOL",
    icon: "/src/assets/sol.svg",
    balance: 0,
  };

  const highSlippage = false;
  const lowSlippage = false;
  const insufficientBalance = false;

  useEffect(() => {
    const getQuote = async () => {
      // const quote = await getRaydiumSwapQuote({
      //   inputMint: "So11111111111111111111111111111111111111112", // SOL
      //   outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      //   inputAmount: "1000000000", // 1 SOL in lamports
      //   slippage: 0.5,
      // });
      // const quote = await getJupiterSwapQuote({
      //   inputMint: "So11111111111111111111111111111111111111112", // SOL
      //   outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      //   inputAmount: "1000000000",
      //   slippage: 0.5,
      // });
      // console.log(quote);
      // const response = await getAuraQuote(
      //   fromToken.address,
      //   toToken.address,
      //  String(
      //   fromToken?.decimals
      //     ? payAmount * 10 ** fromToken?.decimals
      //     : payAmount * 10 ** 9
      // ),
      //   Number(slippageTolerance),
      //   selectedAccount.publicKey,
      //   connection
      // ); // Example inputs
      // console.log("Swap successful:", response, selectedAccount.publicKey);
    };
    // getQuote();
  }, [
    selectedAccount,
    slippageTolerance,
    connection,
    fromToken,
    toToken,
    payAmount,
  ]);

  const getQuote = useCallback(async () => {
    // const quote = await getJupiterSwapQuote({
    //   inputMint: fromToken?.address,
    //   outputMint: toToken?.address,
    //   inputAmount: String(
    //     fromToken?.decimals
    //       ? payAmount * 10 ** fromToken?.decimals
    //       : payAmount * 10 ** 9
    //   ),
    //   slippage: Number(slippageTolerance),
    // });
    const response = await getAuraQuote(
      fromToken.address,
      toToken.address,
      String(
        fromToken?.decimals
          ? payAmount * 10 ** fromToken?.decimals
          : payAmount * 10 ** 9
      ),
      Number(slippageTolerance),
      selectedAccount.publicKey,
      connection
    ); // Example inputs
    if (response.quote) {
      setQuote(response.quote ?? null);
      setTx(response.tx ?? null);
      console.log("Quote successful:", response, selectedAccount.publicKey);
      navigate("/swap/confirmation");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch Quote: ROUTE_NOT_FOUND",
      });
    }

    // const { transaction, blockhash, lastValidBlockHeight } = await getJupiterTransaction({
    //   quoteResponse: quote,
    //   userPublicKey: wallet.publicKey.toString(),
    //   connection,
    // });
    // const data = {
    //   transaction,
    //   quote,
    //   blockhash,
    //   lastValidBlockHeight
    // };
    //     const signedTx = await wallet.signTransaction(swap.transaction);
    // const signature = await connection.sendTransaction(signedTx);
  }, [
    fromToken,
    toToken,
    slippageTolerance,
    payAmount,
    setQuote,
    navigate,
    selectedAccount,
    connection,
    setTx,
  ]);

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundSvg})`,
        width: theme.rootWidth,
      }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-6 ">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Swap</span>
        </button>
      </div>

      {/* Main Swap Card */}
      <div className="mx-4">
        <div className="bg-[#171121]/80 backdrop-blur-lg rounded-2xl p-4 space-y-4 border border-main-300">
          {/* Insufficient Balance */}
          {insufficientBalance && (
            <div className="text-system-danger text-xs mt-2 flex items-center">
              <CircleX className="w-4 h-4 mr-2" />
              Insufficient balance
            </div>
          )}
          {/* You Pay Section */}
          <div className="space-y-2">
            <div className="text-main-100 text-sm">You Pay</div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="bg-transparent text-3xl text-white outline-none w-1/2"
                placeholder="0"
              />
              <TokenDrawer selected={fromToken} setSelected={setFrom} />
            </div>
            <div className="text-main-200 text-sm">
              Balance: {payToken.balance} {fromToken?.symbol}
            </div>
          </div>

          {/* Swap Icon */}
          <div className="flex justify-center w-full items-center relative">
            <div className="absolute w-full h-1 border border-neutral-600"></div>
            <div className=" bg-[#152531] px-3 rounded-full flex items-center justify-center z-10">
              <img src={swapIcon} alt="Swap Icon" className="w-10 h-10" />
            </div>
          </div>

          {/* You Get Section */}
          <div className="space-y-2">
            <div className="text-white/60 text-sm">You Get</div>
            <div className="flex justify-between items-center">
              <input
                type="number"
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(Number(e.target.value))}
                className="bg-transparent text-3xl text-white outline-none w-1/2"
                placeholder="0"
              />
              <TokenDrawer selected={toToken} setSelected={setTo} />
            </div>
            <div className="text-indigo-400 text-sm">
              Balance: {receiveToken.balance} {toToken?.symbol}
            </div>
          </div>

          <div className=" w-full h-1 border border-neutral-600 my-4"></div>

          {/* Total */}
          <div className="flex justify-between text-white py-2">
            <span>Total</span>
            <span>$0.0</span>
          </div>

          {/* Slippage Tolerance */}
          <div className="space-y-3">
            <div className="text-white text-sm">Slippage Tolerance</div>
            <div className="flex gap-2 border-2 border-main-300 rounded-lg p-1">
              {[0.1, 0.3, 0.5, 1.0].map((value) => (
                <button
                  key={value}
                  onClick={() => setSlippageTolerance(value)}
                  className={`flex-1 rounded-lg py-2 text-sm ${
                    slippageTolerance === value
                      ? "bg-indigo-600 text-white"
                      : "text-white/70"
                  }`}
                >
                  {value}%
                </button>
              ))}
            </div>

            {/* Custom Slippage - Show inline on mobile, as button on desktop */}
            <div className="min-[400px]:hidden">
              <div className="flex flex-col gap-2">
                <span className="text-white text-sm">Custom Slippage</span>
                <div
                  className={`flex items-center justify-between bg-[#2C243B] border ${
                    highSlippage || lowSlippage
                      ? "border-system-danger"
                      : "border-white/40"
                  } rounded-lg px-4 py-3`}
                >
                  <input
                    type="number"
                    placeholder="0.0"
                    value={slippageTolerance}
                    onChange={(e) =>
                      setSlippageTolerance(Number(e.target.value))
                    }
                    max={10}
                    className="bg-transparent text-white w-full outline-none"
                  />
                  <span className="text-white ml-2">%</span>
                </div>
              </div>
            </div>

            <div className="hidden min-[400px]:block">
              <button
                onClick={() => setShowSlippageDialog(true)}
                className="w-full py-3 px-4 rounded-lg border border-white/20 text-white"
              >
                Custom Slippage
              </button>
            </div>
          </div>

          {/* Preview Button */}
          <button
            className={`w-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white py-3 rounded-3xl mt-4 ${
              highSlippage || lowSlippage || insufficientBalance
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={highSlippage || lowSlippage || insufficientBalance}
            onClick={() => getQuote()}
          >
            Preview
          </button>

          {/* Add the dialog component */}
          <CustomSlippageDialog
            isOpen={showSlippageDialog}
            onClose={() => setShowSlippageDialog(false)}
            onApply={setSlippageTolerance}
            initialValue={slippageTolerance}
            highSlippage={highSlippage}
            lowSlippage={lowSlippage}
          />
        </div>
      </div>
    </div>
  );
}
