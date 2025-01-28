/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TradingSelector } from "@/components/TradingSelector";
import { TokensExploreCard } from "../TokensExploreCard";
import { Fragment, useEffect, useMemo, useState } from "react";
// import axios from "axios";
import { topTokensEx } from "@/config";
import tokenList from "@/config/tokenList.json";
import theme from "@/config/theme";

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

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

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

export default function TokensInterface() {
  const items = useMemo(
    () => ["Market Cap", "Gainers", "Losers", "Volume"],
    []
  );
  const topTokens:any = topTokensEx.data;

  const [tokens, setTokens] = useState<typeof topTokens.data>([]);
  const [sortByMc, setSortByMc] = useState<typeof topTokens.data>([]);
  const [sortByChange, setSortByChange] = useState<typeof topTokens.data>([]);
  const [gainers, setGainers] = useState<typeof topTokens.data>([]);
  const [loosers, setLoosers] = useState<typeof topTokens.data>([]);
  const [selected, setSelected] = useState(items[0]);
  const [tokensWithLogo, setTokensWithLogo] = useState<typeof topTokens.data>(
    []
  );
  useEffect(() => {
    const getTokens = async () => {
      // const response = await axios.get(
      //   `https://pro-api.solscan.io/v2.0/token/top`,
      //   {
      //     headers: { token: import.meta.env.VITE_SOLSCAN_API_KEY },
      //   }
      // );
      // console.log(response);
      const topTokens = topTokensEx.data;
      const tokenLookup = tokenList.reduce((map, token) => {
        map[token.address] = token.logo;
        return map;
      }, {});
      const updatedTokens = topTokens.map((token:any) => ({
        ...token,
        logo: tokenLookup[token.address] || null,
      }));
      setTokensWithLogo(updatedTokens);
      const sortedByMC = [...updatedTokens].sort(
        (a, b) => b?.market_cap - a?.market_cap
      );
      const sortedByChange = [...updatedTokens].sort(
        (a, b) => b?.price_24h_change - a?.price_24h_change
      );
      const gainersData = [...updatedTokens]
        .filter((item) => item.price_24h_change > 0)
        .sort((a, b) => b.price_24h_change - a.price_24h_change);
      const losersData = [...updatedTokens]
        .filter((item) => item.price_24h_change < 0)
        .sort((a, b) => a.price_24h_change - b.price_24h_change);
      setSortByMc(sortedByMC);
      setSortByChange(sortedByChange);
      setGainers(gainersData);
      setLoosers(losersData);
    };
    getTokens();
  }, []);
  useEffect(() => {
    if (selected === items[0]) setTokens(sortByMc);
    else if (selected === items[1]) setTokens(gainers);
    else if (selected === items[2]) setTokens(loosers);
    else setTokens(sortByChange);
  }, [gainers, loosers, sortByChange, sortByMc, items, selected]);

  // useEffect(() => {
  //   const getTokens = async () => {
  //     if (tokens.length > 0) {
  //       const response = await axios.get("https://cache.jup.ag/tokens");
  //       const tokense = response.data;
  //       console.log(tokense);
  //     }
  //   };
  //   getTokens();
  // }, [tokens]);

  return (
    <div className="min-h-screen space-y-8 w-full">
      <Carousel
        className="w-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="">
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <Fragment key={index}>
                {tokensWithLogo?.length > 0 && (
                  <CarouselItem key={index} className="basis-[60%]">
                    <TokensExploreCard
                      logo={tokens[index]?.logo}
                      title={tokens[index]?.symbol}
                      category={tokens[index]?.name}
                      price={tokens[index]?.price}
                      priceChange={tokens[index]?.price_24h_change}
                    />
                  </CarouselItem>
                )}
              </Fragment>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="space-y-4">
        <TradingSelector
          selected={selected}
          setSelected={setSelected}
          items={items}
        />
        <div className="divide-y divide-neutral-400 bg-neutral-800 rounded-lg px-4 border border-main-300">
          {tokens?.slice(0, 20)?.map((site:any, index:any) => {
            return (
              <div key={index} className="flex items-center gap-4 py-4">
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
                          const img = e.target as HTMLImageElement;  // Cast e.target to HTMLImageElement
                          img.style.display = "none";

                          const parent = img.parentNode as HTMLElement;  // Cast parentNode to HTMLElement
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
                  <p className="text-main-100 text-sm font-light">
                    {site.name}
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
