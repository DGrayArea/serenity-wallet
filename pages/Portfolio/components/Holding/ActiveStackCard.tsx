export default function ActiveStackCard() {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        background: "#251C37",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex justify-between items-center text-white">
        <div>
          <span className="text-[13.33px] font-light tracking-[0.533px] text-[#D4CAFF]">
            Active Stack
          </span>
          <p className="text-[23.04px] font-normal mt-2">0%</p>
        </div>
        <div>
          <span className="text-[13.33px] font-light tracking-[0.533px] text-[#D4CAFF]">
            Stack
          </span>
          <p className="text-[23.04px] font-normal mt-2">0 SOL</p>
        </div>
      </div>
    </div>
  );
}
