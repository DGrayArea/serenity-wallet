/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { DefiCard } from "@/components/DefiCard";
import { TradingSelector } from "@/components/TradingSelector";
import { Fragment, useEffect, useMemo, useState } from "react";
import { collectionsD } from "@/config";

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

export default function DefiInterface() {
  const [collections, setColections] = useState<typeof collectionsD.data>([]);
  const [top, setTop] = useState<typeof collectionsD.data>([]);
  const [trending, setTrending] = useState<typeof collectionsD.data>([]);
  const items = useMemo(() => ["Trending", "Top"], []);
  const [selected, setSelected] = useState(items[0]);
  useEffect(() => {
    const getTokens = async () => {
      // const response = await axios.get(
      //   `https://pro-api.solscan.io/v2.0/nft/collection/lists?range=1&sort_order=desc&sort_by=volumes&page=1&page_size=10`,
      //   {
      //     headers: { token: import.meta.env.VITE_SOLSCAN_API_KEY },
      //   }
      // );
      // const res = await axios.get(
      //   "https://api-mainnet.magiceden.dev/v2/marketplace/popular_collections?timeRange=1d&limit=50"
      // );
      // console.log(res);
      const data = collectionsD.data;
      const sortedBy24 = [...data].sort(
        (a, b) => Number(b?.volumes_change_24h) - Number(a?.volumes_change_24h)
      );
      const sortedByFloor = [...data].sort(
        (a, b) => b?.floor_price - a?.floor_price
      );
      setTop(sortedByFloor);
      setTrending(sortedBy24);
      // const response = await axios.post(
      //   import.meta.env.VITE_MAINNET,
      //   JSON.stringify({
      //     jsonrpc: "2.0",
      //     id: "text",
      //     method: "getAssetsByOwner",
      //     params: {
      //       ownerAddress: "7bqG4gqxbkVHvrazbELawLVzoMgf93G8EFFu2MxtbAbE",
      //       page: 1, // Starts at 1
      //       limit: 100,
      //     },
      //   })
      // );
      // const fetchedNFTs = response.data.result.items || [];
    };
    getTokens();
  }, []);

  useEffect(() => {
    if (selected === items[0]) setColections(top);
    else setColections(trending);
  }, [selected, top, trending, items]);

  return (
    <div className="min-h-screen space-y-8 w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="-ml-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Fragment key={index}>
              {collections.length > 0 && (
                <CarouselItem key={index} className="pl-4 basis-[60%]">
                  <DefiCard
                    title={collections[index].name}
                    category={collections[index].symbol}
                    logo=""
                  />
                </CarouselItem>
              )}
            </Fragment>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="space-y-4">
        <TradingSelector
          items={items}
          selected={selected}
          setSelected={setSelected}
        />
        <div className="divide-y divide-neutral-400 bg-neutral-800 rounded-lg px-4 border border-main-300">
          {collections?.map((site: any, index: any) => (
            <div key={index + 1} className="flex items-center gap-4 py-4">
              <span className="text-white text-xs font-light w-3">
                {index + 1}
              </span>
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                {site?.logo ? (
                  <>
                    <img
                      src={site.logo}
                      alt={site.name}
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement; // Cast to HTMLImageElement
                        img.style.display = "none";

                        const parent = img.parentNode as HTMLElement; // Now we can safely access parentNode
                        const fallback = parent.querySelector(".acronym");

                        if (fallback) fallback.classList.remove("hidden");
                      }}
                    />
                    <span className="hidden acronym text-white font-semibold text-xs">
                      {getAcronym(site.name)}
                    </span>
                  </>
                ) : (
                  <span className="text-white font-bold text-sm">
                    {getAcronym(site.symbol)}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-white font-light">{site.symbol}</h3>
                <p className="text-main-100 text-sm font-light">{site.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
