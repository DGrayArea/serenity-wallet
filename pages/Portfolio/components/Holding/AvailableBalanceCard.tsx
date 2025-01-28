export default function AvailableBalanceCard() {
  return (
    <div
      className="p-6 rounded-lg"
      style={{
        background: "#251C37",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="text-[13.33px] font-light text-[#D4CAFF]">Available Balance</span>
      <span className="flex items-center">
        <p className="text-[23.04px] font-normal mt-2">0</p>
        <p className="text-[23.04px] font-normal mt-2 ml-1 text-[#D4CAFF]">SOL</p>
      </span>
      <button className="mt-4 w-full py-2 text-[13.33px] font-semibold text-[#D4CAFF] border border-[rgba(255,255,255,0.4)] rounded-[64px] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] transition">
        Withdraw
      </button>
    </div>
  );
}
