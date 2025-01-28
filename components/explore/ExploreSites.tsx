import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DefiCard } from "@/components/DefiCard";
import { TradingSelector } from "@/components/TradingSelector";
import { useEffect, useState } from "react";
// import axios from "axios";
import defillamaData from "@/config/defillama.json";
// import React from "react";
// import { useColor } from "color-thief-react";
// import { Card, CardContent } from "@/components/ui/card";
// import defiBg from "@/assets/defi-bg.png";

// type Site = {
//   name: string;
//   category: string;
//   logo: string;
// };

// type CardProps = {
//   site: Site;
// };

// const TrendingCard: React.FC<CardProps> = ({ site }) => {
//   const { color, error } = useColor(site.logo, "hex", {
//     crossOrigin: "Anonymous",
//   });

//   return (
//     <Card className="relative overflow-hidden border-0 group">
//       {/* Dynamic Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: error
//             ? `${defiBg}` // Fallback if dominant color fails
//             : `linear-gradient(120deg, ${color || "#000"}, ${color || "#222"})`,
//         }}
//       />

//       {/* Logo Pattern Overlay */}
//       <div className="absolute inset-0 opacity-50 bg-[url('/placeholder.svg?height=400&width=400')]" />

//       {/* Card Content */}
//       <CardContent className="relative p-6 flex flex-col gap-2 h-44">
//         {/* Logo Container */}
//         <div className="p-2 bg-white/10 backdrop-blur-sm w-fit rounded-full z-20">
//           <img
//             src={site.logo}
//             alt={`${site.name} Logo`}
//             className="w-8 h-8 object-contain"
//           />
//         </div>

//         {/* Footer Content */}
//         <div className="absolute inset-x-0 bottom-0 bg-[#0D0913B8] py-5 px-3 backdrop-blur-md flex flex-col gap-1 z-10">
//           <h3 className="text-xs font-light text-white">{site.name}</h3>
//           <p className="text-xs font-light text-main-100">{site.category}</p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const sitesList = [
//   {
//     rank: 1,
//     name: "Jupiter",
//     category: "DeFi",
//     icon: "https://jup.ag/favicon-32x32.png",
//   },
//   {
//     rank: 2,
//     name: "pump.fun",
//     category: "DeFi",
//     icon: "https://pump.fun/favicon.ico",
//   },
//   {
//     rank: 3,
//     name: "Raydium",
//     category: "DeFi",
//     icon: "https://raydium.io/favicon-32x32.png",
//   },
//   {
//     rank: 4,
//     name: "DRiP",
//     category: "Collectibles",
//     icon: "https://drip.haus/favicon.ico",
//   },
//   {
//     rank: 5,
//     name: "sanctum",
//     category: "Staking",
//     icon: "https://stake.sanctum.so/favicon.ico",
//   },
//   {
//     rank: 6,
//     name: "Magic Eden",
//     category: "Marketplace",
//     icon: "https://magiceden.io/favicon.ico",
//   },
//   {
//     rank: 7,
//     name: "Claim Your Sol",
//     category: "Tools",
//     icon: "https://claimyour.sol.tools/favicon.ico",
//   },
//   {
//     rank: 8,
//     name: "Photon",
//     category: "Tools",
//     icon: "https://photon.sol.tools/favicon.ico",
//   },
// ];
const getAcronym = (name: string) => {
  const words = name.split(" ");
  if (words.length > 1) {
    return words
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 3);
  } else {
    return name.slice(0, 3).toUpperCase();
  }
};

// const trendingSites = [
//   {
//     name: "Pump",
//     category: "Launchpad",
//     logo: "https://icons.llamao.fi/icons/protocols/flashtrade.jpg",
//   },
//   {
//     name: "Solana",
//     category: "Chain",
//     logo: "https://icons.llamao.fi/icons/protocols/drift-trade.jpg",
//   },
//   {
//     name: "Photon",
//     category: "Telegram Bot",
//     logo: "https://icons.llamao.fi/icons/protocols/adrena-protocol.jpg",
//   },
// ];
export default function DefiInterface() {
  const [topDapps, setTopDapps] = useState<typeof defillamaData.data.protocols>(
    []
  );
  const [trendingDapps, setTrendingDapps] = useState<
    typeof defillamaData.data.protocols
  >([]);
  const items = ["Trending", "Top"];
  const [dapps, setDapps] = useState<typeof defillamaData.data.protocols>([]);
  const [selected, setSelected] = useState(items[0] || "Select");
  useEffect(() => {
    const getMetrics = async () => {
      // const response = await axios.get(
      //   "https://api.llama.fi/overview/fees/solana?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyRevenue"
      // );
      const data = defillamaData.data.protocols;
      const sortedByTotal24h = [...data].sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) => b?.total24h - a?.total24h
      );
      const sortedByChange1d = [...data].sort(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a: any, b: any) => b?.change_1d - a?.change_1d
      );
      setTopDapps(sortedByTotal24h);
      setTrendingDapps(sortedByChange1d);
    };
    getMetrics();
  }, []);

  useEffect(() => {
    if (selected == "Trending") {
      setDapps(trendingDapps);
    } else {
      setDapps(topDapps);
    }
  }, [selected, topDapps, trendingDapps]);

  return (
    <div className="min-h-screen space-y-8">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-4 basis-[60%]">
              {dapps?.length > 0 && (
                <DefiCard
                  title={dapps[index]?.name}
                  category={dapps[index]?.category}
                  logo={dapps[index]?.logo}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="space-y-4">
        <TradingSelector
          selected={selected}
          setSelected={setSelected}
          items={items}
        />
        <div className="divide-y divide-neutral-400 bg-neutral-800 rounded-lg px-4 border border-main-300">
          {/* {sitesList.map((site) => (
            <div key={site.rank} className="flex items-center gap-4 py-4">
              <span className="text-white text-xs font-light w-3">
                {site.rank}
              </span>
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800">
                <img
                  src={site.icon}
                  alt={site.name}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-light">{site.name}</h3>
                <p className="text-main-100 text-sm font-light">
                  {site.category}
                </p>
              </div>
            </div>
          ))} */}
          {dapps?.map((site, index) => {
            return (
              <div
                key={site.logo + index}
                className="flex items-center gap-4 py-4"
              >
                <span className="text-white text-xs font-light w-3">
                  {index + 1}
                </span>
                <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {site.logo ? (
                    <>
                      <img
                        src={site.logo}
                        alt={site.displayName}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement; // Cast e.target to HTMLImageElement
                          img.style.display = "none";

                          const parent = img.parentNode as HTMLElement; // Now it's safe to access parentNode
                          const fallback = parent.querySelector(".acronym");

                          if (fallback) fallback.classList.remove("hidden");
                        }}
                      />
                      <span className="hidden acronym text-white font-semibold text-xs absolute">
                        {getAcronym(site.name)}
                      </span>
                    </>
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {getAcronym(site.name)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-light">{site.name}</h3>
                  <p className="text-main-100 text-sm font-light">
                    {site.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
