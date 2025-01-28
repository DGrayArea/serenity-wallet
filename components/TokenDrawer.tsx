"use client";

import * as React from "react";
import { ChevronDown, SearchIcon, CircleHelp } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import tokenList from "@/config/tokenList.json";
import { Input } from "./ui/input";
import { Token } from "@/hooks/useCollections";
import theme from "@/config/theme";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

const TokenCard = ({
  data,
  select,
}: {
  data: Token;
  select: (token: Token) => void;
}) => {
  return (
    <div
      onClick={() => select(data)}
      className="flex flex-row justify-between items-center border border-[#8884FF] text-[#8884FF] my-3 py-3 rounded-lg px-3 font-extralight text-sm"
    >
      <div className="flex flex-row items-center">
        <div className="mr-3">
          {data?.logo ? (
            <>
              <img
                src={data.logo}
                alt={data.address}
                className="w-10 h-10 rounded-full"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const parent = img.parentNode as HTMLElement;
                  const fallback = parent.querySelector(".acronym");
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="acronym hidden">
                <CircleHelp className="w-10 h-9 text-white" />
              </div>
            </>
          ) : (
            <div className="acronym">
              <CircleHelp className="w-10 h-9 text-white" />
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <div className="text-white text-xs">{data?.symbol}</div>
          <div className="">
            {data?.name?.length > 10
              ? `${data?.name.slice(0, 10)}...`
              : data?.name}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-white">
          {(Math.random() * (500 - 0.5) + 0.5).toFixed(2)} {data?.symbol}
        </div>
        <div className="text-xs">${Number(data?.price).toFixed(2)}</div>
      </div>
    </div>
  );
};
export function TokenDrawer({
  selected,
  setSelected,
}: {
  selected: Token;
  setSelected: (token: Token) => void;
}) {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex items-center px-4 py-2 text-white">
          <div className="mr-2">
            {selected?.logo ? (
              <>
                <img
                  src={selected?.logo}
                  alt={selected?.symbol}
                  className="w-8 h-8 mr-2 rounded-full"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = "none";
                    const parent = img.parentNode as HTMLElement;
                    const fallback = parent.querySelector(".acronym");
                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <div className="acronym hidden">
                  <CircleHelp className="w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="acronym">
                <CircleHelp className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          {selected?.symbol}
          <span className="ml-2">
            <ChevronDown />
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#0D0913B8] border border-[#8884FF] backdrop-blur-md" style={{ width: theme.rootWidth }}>
        <div className="w-full">
          <DrawerHeader className="w-full">
            <DrawerTitle className="w-full">
              <div className="border border-slate-800/95 w-full flex flex-row items-center rounded-md py-3 px-1">
                <Input
                  placeholder="Search"
                  className="border-none outline-none text-[#B5C8F9]"
                />
                <SearchIcon className="w-8 text-white" />
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 h-72 overflow-y-auto">
            {tokenList.slice(0, 21)?.map((token, index) => {
              return (
                <DrawerClose key={index} className="w-full">
                  <TokenCard data={token} select={setSelected} />
                </DrawerClose>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
