import { useState, useEffect } from "react";
import axios from "axios";
import TokenSelect from "./Holding/TokenSelect";
import TotalEarn from "./Holding/TotalEranCard";
import BalanceChange from "./Holding/BalanceChangeCard";
import ActiveStackCard from "./Holding/ActiveStackCard";
import LockedBalanceCard from "./Holding/LockedBalanceCard";
import AvailableBalanceCard from "./Holding/AvailableBalanceCard";
import StackedCard from "./Holding/StackedCard";
import TotalEarnedChartCard from "./Holding/TotalEarnedChartCard";

export default function Holdings() {
  const [coins, setCoins] = useState<
    { id: string; symbol: string; name: string; image: string }[]
  >([]);
  const [selectedAsset, setSelectedAsset] = useState<string>("solana");
  const [balanceChartData, setBalanceChartData] = useState<
    { x: string; y: number }[]
  >([]);
  const [balancePercentage, setBalancePercentage] = useState<number | null>(
    null
  );
  const [balanceMovement, setBalanceMovement] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<string>("active");

  useEffect(() => {
    fetchCoins();
    fetchBalanceData("7D");
  }, []);

  useEffect(() => {
    fetchBalanceData("7D"); // Update data when selectedAsset changes
  }, [selectedAsset]);

  const fetchCoins = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_COINGECKO_API_URL
        }/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
      );
      setCoins(response.data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  const fetchBalanceData = async (filter: string) => {
    let days = 7;
    switch (filter) {
      case "24H":
        days = 1;
        break;
      case "30D":
        days = 30;
        break;
      case "90D":
        days = 90;
        break;
      case "1Y":
        days = 365;
        break;
      case "ALL":
        days = 1825;
        break;
      default:
        days = 7;
    }

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_COINGECKO_API_URL
        }/coins/${selectedAsset}/market_chart?vs_currency=usd&days=${days}`
      );
      const prices = response?.data?.prices || [];
      const formattedData = prices.map(
        ([timestamp, price]: [number, number]) => ({
          x: new Date(timestamp).toLocaleDateString(),
          y: price,
        })
      );
      setBalanceChartData(formattedData);

      if (prices.length > 1) {
        const startPrice = prices[0][1];
        const endPrice = prices[prices.length - 1][1];
        setBalancePercentage(((endPrice - startPrice) / startPrice) * 100);
        setBalanceMovement(endPrice - startPrice);
      }
    } catch (error) {
      console.error("Error fetching balance data:", error);
      setBalanceChartData([]);
    }
  };

  return (
    <div className="space-y-6 border-[1px] border-[#8884FF] rounded-lg shadow-lg bg-[rgba(13,9,19,0.72)] p-4">
      <TotalEarn />
      <BalanceChange
        balancePercentage={balancePercentage}
        balanceMovement={balanceMovement}
        balanceChartData={balanceChartData}
      />

      <div className="grid grid-cols-2 gap-2 my-4 w-full border border-[#8884FF] rounded-md p-1">
        <button
          className={`w-full px-6 py-2 rounded-lg ${
            activeTab === "active"
              ? "bg-[linear-gradient(270deg,#8884FF,#573CFA)] text-white"
              : "bg-transparent text-[#8884FF]"
          }`}
          onClick={() => setActiveTab("active")}
        >
          Active
        </button>
        <button
          className={`w-full px-6 py-2 rounded-lg ${
            activeTab === "finished"
              ? "bg-[linear-gradient(270deg,#8884FF,#573CFA)] text-white"
              : "bg-transparent text-[#8884FF]"
          }`}
          onClick={() => setActiveTab("finished")}
        >
          Finished
        </button>
      </div>

      {activeTab === "active" && (
        <>
          <TokenSelect
            tokens={coins}
            selectedToken={selectedAsset}
            onSelectToken={setSelectedAsset}
          />
          <ActiveStackCard />
          <LockedBalanceCard />
          <AvailableBalanceCard />
          <BalanceChange
            balancePercentage={balancePercentage}
            balanceMovement={balanceMovement}
            balanceChartData={balanceChartData}
          />
        </>
      )}

      {activeTab === "finished" && (
        <>
          <StackedCard />
          <LockedBalanceCard />
          <TotalEarnedChartCard
            balancePercentage={balancePercentage}
            balanceMovement={balanceMovement}
            balanceChartData={balanceChartData}
          />
        </>
      )}
    </div>
  );
}
