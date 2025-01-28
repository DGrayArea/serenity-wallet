import { cryptoNews } from "@/config";
// import axios from "axios";
import { useEffect, useState } from "react";

type NewsItem = typeof cryptoNews.articles[0];

// const dummyNews: NewsItem[] = [
//   {
//     image:
//       "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/LD7WEPSAP7XPVEERGVIKMYX24Q.JPG&w=1600&h=900",
//     title:
//       "Cryptocurrency prices today: Check rates of Bitcoin, Ethereum, Dogecoin, Solana",
//     timestamp: "02:00 EST, 12/05/24",
//   },
//   {
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0vg1qTKG76HLTv5FmqsllRnWGeqH4ZqbMg&s",
//     title: "INFORMATION: Network TRC20 for USDC Coin",
//     timestamp: "02:00 EST, 12/05/24",
//   },
//   // Add more news items as needed
// ];

// const options = {
//   hour: "2-digit",
//   minute: "2-digit",
//   hour12: true,
//   timeZone: "America/New_York",
//   day: "2-digit",
//   month: "2-digit",
//   year: "2-digit",
// };
const NewsCard = ({ item }: { item: NewsItem }) => (
  <>
    {item.description === "[Removed]" ? (
      <></>
    ) : (
      <div
        onClick={() => window.open(item.url, "_blank")}
        className="bg-[#ffffff0d] backdrop-blur-lg rounded-xl overflow-hidden border border-[#ffffff26] mb-4 h-64 cursor-pointer"
      >
        <div className=" relative overflow-hidden h-full">
          <img
            src={item.urlToImage!}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end bg-[#0D0913B8] backdrop-blur-md h-28">
            <h3 className="text-white font-light text-base mb-2 line-clamp-2 capitalize">
              {item.title}
            </h3>
            <p className="text-white/60 text-xs">
              {/* {new Date(item.publishedAt).toLocaleString("en-US", options)} */}
              {new Date(item.publishedAt).toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    )}
  </>
);

const ExploreNews = () => {
  const [news, setNews] = useState<typeof cryptoNews.articles>([]);
  useEffect(() => {
    const getNews = async () => {
      // const response = await axios.get(
      //   `https://newsapi.org/v2/top-headlines?q=crypto&apiKey=${
      //     import.meta.env.VITE_NEWS_API
      //   }`
      // );
      setNews(cryptoNews.articles);
    };
    getNews();
  }, []);

  return (
    <div className="space-y-4">
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        news?.map((item: any, index: any) => (
          <NewsCard key={index} item={item} />
        ))}
    </div>
  );
};

export default ExploreNews;
