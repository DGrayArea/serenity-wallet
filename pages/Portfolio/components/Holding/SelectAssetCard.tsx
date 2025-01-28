import DropDown from "@/assets/arrow-down.svg";

export default function SelectAssetCard({
  coins,
  selectedAsset,
  dropdownOpen,
  setSelectedAsset,
  setDropdownOpen,
}: {
  coins: { id: string; symbol: string; name: string; image: string }[];
  selectedAsset: string;
  dropdownOpen: boolean;
  setSelectedAsset: (asset: string) => void;
  setDropdownOpen: (state: boolean) => void;
}) {
  return (
    <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.04)]">
      <h2 className="text-[#93EBD3] text-sm font-medium tracking-[0.5px]">Select Asset</h2>
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between bg-transparent py-2 rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <img
            src={coins.find((coin) => coin.id === selectedAsset)?.image || ""}
            alt={`${selectedAsset} Icon`}
            className="w-8 h-8"
          />
          <span className="text-white text-base font-semibold tracking-[0.5px]">
            {coins.find((coin) => coin.id === selectedAsset)?.symbol.toUpperCase() || ""}
          </span>
        </div>
        <img
          src={DropDown}
          alt="Dropdown Arrow"
          className={`w-4 h-4 text-[#8884FF] transform transition-transform ${
            dropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {dropdownOpen && (
        <div className="mt-2 rounded-lg max-h-40 overflow-y-auto scrollbar-none">
          {coins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => {
                setSelectedAsset(coin.id);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#2A2236]"
            >
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              <span className="text-white">{coin.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
