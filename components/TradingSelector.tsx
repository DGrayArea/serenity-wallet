import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TradingSelectorProps {
  items: string[];
  selected: string;
  setSelected: (item: string) => void;
}

export function TradingSelector({
  items,
  selected,
  setSelected,
}: TradingSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="font-semibold text-white bg-white/10 p-4 focus:ring-0 rounded-md border border-white/30 min-w-32 hover:bg-white/20 hover:text-white backdrop-blur-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-light">{selected}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-white/10 border-white/30 backdrop-blur-sm"
      >
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => setSelected(item)}
            className="text-white focus:bg-gray-700 focus:text-white cursor-pointer"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
