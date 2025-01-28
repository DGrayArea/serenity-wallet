import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

type DropdownProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onToggle: () => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  title,
  children,
  className,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`w-full bg-[#171121] rounded-lg border-[1px] border-[#8884FF] mb-4 ${className}`}
    >
      <div
        onClick={onToggle}
        className="flex justify-between items-center p-4 cursor-pointer"
      >
        <span className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
          {title}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        )}
      </div>

      {isOpen && (
        <div className="p-4 text-sm text-[#D4CAFF] overflow-hidden">
          <p className="whitespace-normal break-words max-h-[300px] overflow-y-auto">
            {children}
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
