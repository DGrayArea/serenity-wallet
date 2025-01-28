import { useState, useEffect } from "react";
import axios from "axios";
import InfoIcon from "@/assets/InfoIcon.svg";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

// Register chart components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip
);

const TIME_FILTERS = ["24H", "7D", "30D", "90D", "1Y", "ALL"];

export default function NetWorthPerformance() {
  const [activeFilter, setActiveFilter] = useState("7D");
  const [performanceFilter, setPerformanceFilter] = useState("7D");
  const [netWorth, setNetWorth] = useState<number | null>(null);
  const [depositUSD] = useState(0);
  const [withdrawUSD] = useState(0);
  const [depositCoin] = useState(0);
  const [withdrawCoin] = useState(0);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [movement, setMovement] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [performanceChartData, setPerformanceChartData] = useState<
    { x: string; y: number }[]
  >([]);
  const [lastUpdated, setLastUpdated] = useState<string>("N/A");

  useEffect(() => {
    fetchTokenPrice();
    fetchHistoricalData(activeFilter, setChartData);
  }, [activeFilter]);

  useEffect(() => {
    fetchHistoricalData(performanceFilter, setPerformanceChartData);
  }, [performanceFilter]);

  const fetchTokenPrice = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_COINGECKO_API_URL}/simple/price?ids=solana&vs_currencies=usd`
      );
      const price = response?.data?.solana?.usd || 0;
      setNetWorth(price);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Error fetching token price:", error);
      setNetWorth(null);
    }
  };
  
  const fetchHistoricalData = async (
    filter: string,
    setData: (data: { x: string; y: number }[]) => void
  ) => {
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
        `${import.meta.env.VITE_COINGECKO_API_URL}/coins/solana/market_chart?vs_currency=usd&days=${days}`
      );
      const prices = response?.data?.prices || [];
      const formattedChartData = prices.map(
        ([timestamp, price]: [number, number]) => ({
          x: new Date(timestamp).toLocaleDateString(),
          y: price,
        })
      );
      setData(formattedChartData);
  
      if (filter === activeFilter && prices.length > 1) {
        const startPrice = prices[0][1];
        const endPrice = prices[prices.length - 1][1];
        setPercentage(((endPrice - startPrice) / startPrice) * 100);
        setMovement(endPrice - startPrice);
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setData([]);
    }
  };
  

  const chartConfig = (data: { x: string; y: number }[]) => {
    const labels = data.map((point) => point.x);
    const prices = data.map((point) => point.y);
  
    const colors = prices.map((price, index) =>
      index > 0 && price > prices[index - 1]
        ? "#00FF00" // Green for upward
        : index > 0 && price < prices[index - 1]
        ? "#FF0000" // Red for downward
        : "#8884FF" // Neutral or initial point
    );
  
    return {
      labels,
      datasets: [
        {
          label: "Price",
          data: prices,
          borderColor: colors,
          backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
          borderWidth: 2,
          segment: {
            borderColor: (ctx : any) => {
              const currentIndex = ctx.p0DataIndex;
              if (currentIndex === 0) return "#8884FF"; // Initial point
              return prices[currentIndex] > prices[currentIndex - 1]
                ? "#00FF00" // Green
                : "#FF0000"; // Red
            },
          },
          tension: 0.3,
          pointRadius: 0, // No visible points
        },
      ],
    };
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { color: "#3E3C58" },
        ticks: { color: "#D4CAFF" },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#D4CAFF",
        bodyColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#8884FF",
      },
    },
  };
  

  return (
    <div className="space-y-8 border-[1px] border-[#8884FF] rounded-lg shadow-lg bg-[rgba(13,9,19,0.72)] p-4">
      {/* Asset Net Worth Section */}
      <div>
        <div className="text-sm text-[#D4CAFF] mb-4">
          Last update: <br /> {lastUpdated}
        </div>
        <h2 className="text-base font-light leading-normal tracking-[0.64px] text-[#D4CAFF] flex items-center">
          Asset Net Worth
          <span className="ml-2 cursor-pointer">
            <img src={InfoIcon} alt="Info" className="w-4 h-4 inline-block" />
          </span>
        </h2>

        <div
          className="p-4 mt-4 rounded-lg"
          style={{
            background: "#251C37",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="text-2xl font-bold">
            ${netWorth?.toLocaleString() || "N/A"}
          </div>
          <div className="grid grid-cols-2 text-sm mt-4 text-[#D4CAFF] gap-4">
            <div>
              <p>Deposit (USD):</p>
              <p className="font-semibold text-white">
                ${depositUSD.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Deposit Coin:</p>
              <p className="font-semibold text-white">
                ${depositCoin.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Withdraw (USD):</p>
              <p className="font-semibold text-white">
                ${withdrawUSD.toLocaleString()}
              </p>
            </div>
            <div>
              <p>Withdraw Coin:</p>
              <p className="font-semibold text-white">
                ${withdrawCoin.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center justify-between mt-4 bg-transparent p-1 rounded-lg border border-[#8884FF]">
          {TIME_FILTERS.map((filter, index) => (
            <div key={filter} className="flex items-center">
              <button
                className={`px-2 py-2 text-sm font-semibold rounded-md ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-[#4F46E5] to-[#6D28D9] text-white"
                    : "bg-transparent text-[#D4CAFF]"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
              {index !== TIME_FILTERS.length - 1 && (
                <div className="w-[1px] h-6 bg-[#3E3C58] mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-[#171121] p-4 mt-4 rounded-lg h-48 flex items-center justify-center">
          {chartData.length > 0 ? (
            <Line data={chartConfig(chartData)} options={chartOptions} />
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>
      </div>

      {/* Portfolio Performance Section */}
      <div>
        <h2 className="text-base font-light leading-normal tracking-[0.64px] text-[#D4CAFF] flex items-center">
          Portfolio Performance
          <span className="ml-2 cursor-pointer">
            <img src={InfoIcon} alt="Info" className="w-4 h-4 inline-block" />
          </span>
        </h2>

        <div
          className="p-4 mt-4 rounded-lg"
          style={{
            background: "#251C37",
            backdropFilter: "blur(12px)",
          }}
        >
          <p className="text-sm mb-4">24 May 2024</p>
          <div className="grid grid-cols-1 text-sm gap-2">
            <div>
              <p>Percentage:</p>
              <p className="font-semibold mt-1 text-white">
                {percentage !== null ? `${percentage.toFixed(2)}%` : "N/A"}
              </p>
            </div>
            <div>
              <p>Movement:</p>
              <p className="font-semibold mt-1 text-white">
                ${movement?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Time Filter Buttons */}
        <div className="flex items-center justify-between mt-4 bg-transparent p-1 rounded-lg border border-[#8884FF]">
          {TIME_FILTERS.map((filter, index) => (
            <div key={filter} className="flex items-center">
              <button
                className={`px-2 py-2 text-sm font-semibold rounded-md ${
                  performanceFilter === filter
                    ? "bg-gradient-to-r from-[#4F46E5] to-[#6D28D9] text-white"
                    : "bg-transparent text-[#D4CAFF]"
                }`}
                onClick={() => setPerformanceFilter(filter)}
              >
                {filter}
              </button>
              {index !== TIME_FILTERS.length - 1 && (
                <div className="w-[1px] h-6 bg-[#3E3C58] mx-2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-[#171121] p-4 mt-4 rounded-lg h-48 flex items-center justify-center">
          {performanceChartData.length > 0 ? (
            <Line
              data={chartConfig(performanceChartData)}
              options={chartOptions}
            />
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </div>
      </div>
    </div>
  );
}
