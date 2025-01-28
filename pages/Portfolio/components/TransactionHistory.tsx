import { useNavigate } from "react-router-dom";
import Search from "@/components/ui/search";
import BuyCard from "./TransactionHistory/BuyCard";
import ReceiveCardNft from "./TransactionHistory/ReceiveCardNft";
import SendCard from "./TransactionHistory/SendCard";
import SwapCard from "./TransactionHistory/SwapCard";
import StakeCard from "./TransactionHistory/StakeCard";
import RecieveCard from "./TransactionHistory/RecieveCard";

export default function TransactionHistory() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 border-[1px] border-[#8884FF] rounded-lg shadow-lg bg-[rgba(13,9,19,0.72)] p-4">
      <div className="text-white text-lg font-semibold">
        Transaction History
      </div>
      <Search placeholder="Search" />
      <div className="text-white font-medium">Today</div>

      <div className="space-y-4">
        <div
          className="cursor-pointer"
          onClick={() => navigate("/recieve-nft")}
        >
          <ReceiveCardNft />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate("/buy-history")}
        >
          <BuyCard />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => navigate("/recieve-history")}
        >
          <RecieveCard />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => navigate("/send-history")}
        >
          <SendCard />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate("/swap-history")}
        >
          <SwapCard />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => navigate("/stake-history")}
        >
          <StakeCard />
        </div>
      </div>
    </div>
  );
}
