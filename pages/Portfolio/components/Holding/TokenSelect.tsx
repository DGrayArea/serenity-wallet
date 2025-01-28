import { useState } from "react";
import DropDown from "@/assets/arrow-down.svg";

interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
}

interface TokenSelectProps {
  tokens: Token[];
  selectedToken: string;
  onSelectToken: (tokenId: string) => void;
}

export default function TokenSelect({
  tokens,
  selectedToken,
  onSelectToken,
}: TokenSelectProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="p-4 rounded-lg border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.04)]">
      <h2 className="text-[#93EBD3] text-sm font-medium tracking-[0.5px]">
        Select Asset
      </h2>

      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center justify-between bg-transparent py-2 rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <img
            src={tokens.find((token) => token.id === selectedToken)?.image || ""}
            alt={`${selectedToken} Icon`}
            className="w-8 h-8"
          />
          <span className="text-white text-base font-semibold tracking-[0.5px]">
            {tokens
              .find((token) => token.id === selectedToken)
              ?.symbol.toUpperCase() || ""}
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
        <div
          className="mt-2 rounded-lg max-h-40 overflow-y-auto scrollbar-none"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tokens.map((token) => (
            <div
              key={token.id}
              onClick={() => {
                onSelectToken(token.id);
                setDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#2A2236]"
            >
              <img src={token.image} alt={token.name} className="w-6 h-6" />
              <span className="text-white">{token.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
