import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: "sites", label: "Sites" },
  { id: "news", label: "News" },
  { id: "tokens", label: "Tokens" },
  { id: "collections", label: "Collections" },
] as const;

type TabType = typeof TABS[number]["id"];

interface ExploreHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  className?: string;
}

const ExploreHeader = ({ activeTab, onTabChange,className }: ExploreHeaderProps) => {
  const navigate = useNavigate();

  const handleInputFocus = () => {
    navigate("/explore/search");
  };
  return (
    <header className={`w-full z-10 ${className || ''} `}>
      <div className="relative w-full max-w-2xl mx-auto pt-3 px-5 flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-[#6C5DD3] flex items-center justify-center text-white font-semibold">
            A1
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              onFocus={handleInputFocus}
              className="w-full bg-[#ffffff0d] backdrop-blur-lg text-white rounded-full py-2.5 px-4 pl-4 pr-12
                       border border-[#ffffff26] focus:outline-none focus:border-[#ffffff40]
                       placeholder:text-[#ffffff80]"
              placeholder="Search or type a URL"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>
        </div>

        <div className="flex space-x-8 border-b border-white/10">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`pb-3 px-1 text-sm font-medium relative ${
                activeTab === id
                  ? "text-[#3DD08C]"
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              {label}
              {activeTab === id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3DD08C]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default ExploreHeader;
