const menuItems = [
  "Portfolio",
  "Asset Allocation",
  "Holdings",
  "Transaction History"
];

interface ScrollMenuProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
}

export default function ScrollMenu({
  activeMenu,
  onMenuClick,
}: ScrollMenuProps) {
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    container.scrollLeft += e.deltaY;
  };

  return (
    <div
      className="relative w-full overflow-x-auto scrollbar-none"
      onWheel={handleScroll}
    >
      <div className="flex space-x-8 py-4 px-4 min-w-max">
        {menuItems.map((item) => (
          <div
            key={item}
            onClick={() => onMenuClick(item)}
            className={`text-base font-light leading-normal tracking-[0.64px] cursor-pointer whitespace-nowrap ${
              activeMenu === item ? "text-white" : "text-[#56C5B0]"
            }`}
          >
            {item}
            {activeMenu === item && (
              <div className="h-[2px] bg-[#65CEC0] mt-1 w-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
