export default function TotalEarn() {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        background: "#251C37",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-white text-lg font-semibold">Total Earn</h2>
        <div className="bg-[#3E314C] text-[#D4CAFF] px-3 py-1 rounded-lg text-sm cursor-pointer">
          7D
        </div>
      </div>
      <p className="text-white text-[28px] font-bold mt-2">$4,566.81</p>
      <p className="text-[#D4CAFF] text-sm mt-1">Guaranteed Earn from Entire Profit</p>
      <div className="flex items-center gap-4 mt-4">
        <span className="text-[#93FF50] text-lg font-semibold">+44%</span>
        <span className="text-[#D4CAFF] text-sm">+$31</span>
      </div>
    </div>
  );
}
