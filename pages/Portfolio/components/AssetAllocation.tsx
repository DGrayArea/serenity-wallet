import { useRef } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Sol from "@/assets/sol.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const mockData = {
  total: 123738,
  pnlDaily: 189.91,
  pnlPercentage: 14.67,
  allocations: [
    {
      title: "SOL",
      label: "SOLANA",
      value: 32000,
      color: "#00BFFF",
      iconPath: Sol,
    },
    {
      title: "SOL",
      label: "MUMU",
      value: 15000,
      color: "#FF7F50",
      iconPath: Sol,
    },
    {
      title: "SOL",
      label: "ORCA",
      value: 12000,
      color: "#FFD700",
      iconPath: Sol,
    },
    {
      title: "SOL",
      label: "USDT",
      value: 5780,
      color: "#ADFF2F",
      iconPath: Sol,
    },
  ],
};

export default function AssetAllocation() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.style.cursor = "grabbing";
    container.style.userSelect = "none";

    let startX = e.pageX - container.offsetLeft;
    let scrollLeft = container.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleCardClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.children[index] as HTMLElement;
    if (!card) return;

    const scrollTo =
      card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;

    container.scrollTo({
      left: scrollTo,
      behavior: "smooth",
    });
  };

  const chartData = {
    labels: mockData.allocations.map((item) => item.label),
    datasets: [
      {
        data: mockData.allocations.map((item) => item.value),
        backgroundColor: mockData.allocations.map((item) => item.color),
        hoverBackgroundColor: mockData.allocations.map((item) => item.color),
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#8884FF",
        padding: 10,
      },
    },
    maintainAspectRatio: false,
    cutout: "70%",
  };

  return (
    <div className="space-y-6 border-[1px] border-[#8884FF] rounded-lg shadow-lg bg-[rgba(13,9,19,0.72)] p-4">
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        className="overflow-x-hidden flex gap-4 pb-4 cursor-grab"
        style={{ scrollBehavior: "smooth" }}
      >
        {mockData.allocations.map((item, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className="p-6 rounded-lg flex-shrink-0 flex flex-col items-start w-[275px] shadow-lg"
            style={{
              background: "#251C37",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Icon and Title Section */}
            <div className="flex items-center mb-4 w-full">
              <div className="w-10 h-10 flex items-center justify-center rounded-[10px] bg-[#3E314C] mr-3">
                {/* Use the new iconPath property */}
                <img
                  src={item.iconPath}
                  alt={`${item.label} icon`}
                  className="w-8 h-8"
                />
              </div>

              <div className="flex flex-col justify-between h-full">
                <h2 className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
                  {item.title}
                </h2>
                <p className="text-[#D4CAFF] text-[13.33px] tracking-[0.64px]">
                  {item.label}
                </p>
              </div>
            </div>

            {/* Value Section */}
            <p className="text-[23.04px] mt-[-10px] font-[400] tracking-[1.38px] text-white">
              ${item.value.toLocaleString()}
            </p>

            {/* Line Chart Section */}
            <div className="w-full mt-4">
              <div className="h-20">
                <Line
                  data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: [40, 30, 25, 30, 30, 40, 35],
                        borderColor: "#00D1FF",
                        backgroundColor: "rgba(0, 209, 255, 0.1)",
                        borderWidth: 2,
                        tension: 0.4,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        display: false,
                      },
                      y: {
                        display: false,
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: false,
                      },
                    },
                  }}
                />
              </div>
            </div>

            {/* PNL Section */}
            <div className="flex  justify-between w-full mt-4 text-[#E8DBF4] text-[13.33px] font-light leading-normal tracking-[0.533px]">
              <span className="py-1">PNL Daily</span>
              <span
                className={`text-[13.33px] font-light leading-normal tracking-[0.533px] px-2 py-1 ${
                  mockData.pnlDaily > 0 ? "text-[#93FF50]" : "text-red-400"
                }`}
              >
                +${mockData.pnlDaily.toLocaleString()}
              </span>
              <span
                className={`bg-[rgba(147,255,80,0.24)] rounded-[15px] flex justify-end items-center gap-2 px-2 py-1 ${
                  mockData.pnlPercentage > 0 ? "text-[#93FF50]" : "text-red-400"
                }`}
              >
                +{mockData.pnlPercentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-6 rounded-lg"
        style={{
          background: "#251C37",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 className="text-white text-lg font-semibold mb-4">
          Assets Allocation
        </h2>
        <div className="relative flex items-center justify-center w-full h-[200px]">
          <div className="absolute w-48 h-48 rounded-full" />
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {mockData.allocations.map((item) => {
            let backgroundColor = "rgba(255, 255, 255, 0.1)";
            let borderColor = "#FFFFFF";

            if (item.label === "SOLANA") {
              backgroundColor = "rgba(84, 214, 255, 0.24)";
              borderColor = "#54D6FF";
            } else if (item.label === "MUMU") {
              backgroundColor = "rgba(255, 127, 80, 0.24)";
              borderColor = "#FF7F50";
            } else if (item.label === "ORCA") {
              backgroundColor = "rgba(255, 215, 0, 0.24)";
              borderColor = "#FFD700";
            } else if (item.label === "USDT") {
              backgroundColor = "rgba(173, 255, 47, 0.24)";
              borderColor = "#ADFF2F";
            }

            return (
              <div
                key={item.label}
                className="flex flex-col items-center px-4 py-2 rounded-lg shadow-md"
                style={{
                  backgroundColor: backgroundColor,
                  border: `1px solid ${borderColor}`,
                  backdropFilter: "blur(4px)",
                }}
              >
                <img
                  src={item.iconPath}
                  alt={`${item.label} icon`}
                  className="w-8 h-8 mb-2"
                />
                <div className="flex flex-col items-center">
                  <span className="text-white text-sm font-semibold mb-1">
                    {item.label}
                  </span>
                </div>
                <span className="text-white text-sm font-medium mt-2">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
