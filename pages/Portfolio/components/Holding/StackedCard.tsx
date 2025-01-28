export default function StackedCard() {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        background: "#251C37",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="text-[13.33px] font-light text-[#D4CAFF]">Stacked</span>
      <p className="text-[23.04px] font-normal mt-2">343 SOL</p>
    </div>
  );
}
