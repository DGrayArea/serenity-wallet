import { Line } from "react-chartjs-2";

interface BalanceChangeProps {
  balancePercentage: number | null;
  balanceMovement: number | null;
  balanceChartData: { x: string; y: number }[];
}

const chartConfig = (data: { x: string; y: number }[]) => {
  const labels = data.map((point) => point.x);
  const prices = data.map((point) => point.y);

  return {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: "#8884FF",
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderWidth: 2,
        segment: {
          borderColor: (ctx: any) => {
            const currentIndex = ctx.p0DataIndex;
            const nextIndex = ctx.p1DataIndex;
            if (currentIndex === 0) return "#8884FF";
            return prices[nextIndex] > prices[currentIndex]
              ? "#00FF00"
              : "#FF0000";
          },
        },
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false }, ticks: { display: false } },
    y: { grid: { color: "#3E3C58" }, ticks: { color: "#D4CAFF" } },
  },
  plugins: {
    legend: { display: false },
  },
};

export default function BalanceChange({
  balanceMovement,
  balanceChartData,
}: BalanceChangeProps) {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        background: "#251C37",
        backdropFilter: "blur(12px)",
      }}
    >
      <h2 className="text-white text-lg font-semibold">Total Eraned</h2>

      <p className="text-lg mt-1">
        <span
          style={{
            color:
              balanceMovement !== null
                ? balanceMovement > 0
                  ? "#93FF50"
                  : "#FF0000"
                : "#D4CAFF",
          }}
        >
          {balanceMovement !== null ? `$${balanceMovement.toFixed(2)}` : "N/A"}
        </span>
      </p>
      <div className="h-40 mt-4">
        {balanceChartData.length > 0 ? (
          <Line data={chartConfig(balanceChartData)} options={chartOptions} />
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
}
