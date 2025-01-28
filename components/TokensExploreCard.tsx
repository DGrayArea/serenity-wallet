import { Card, CardContent } from "@/components/ui/card";
import PillIcon from "@/assets/pillIcon.png";

interface TokensExploreCardProps {
  title: string;
  category: string;
  price: string;
  priceChange: string;
  logo: string;
}

export function TokensExploreCard({
  title,
  category,
  price,
  priceChange,
  logo,
}: TokensExploreCardProps) {
  const isPositive = Number(priceChange) > 0;
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
  return (
    <Card className="relative overflow-hidden  bg-white/5 border border-white/20 backdrop-blur-2xl rounded-lg shadow-md">
      <CardContent className="flex flex-col gap-2 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-white/10 flex justify-center items-center">
            {logo ? (
              <>
                <img
                  src={logo ?? PillIcon}
                  alt={`${title} icon`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement; // Cast to HTMLImageElement
                    img.style.display = "none";
                    
                    const parent = img.parentNode as HTMLElement; // Now we can safely access parentNode
                    const fallback = parent.querySelector(".acronym");

                    if (fallback) fallback.classList.remove("hidden");
                  }}
                />
                <span className="hidden acronym text-white font-semibold text-xs absolute">
                  {getAcronym(category)}
                </span>
              </>
            ) : (
              <span className="text-white font-bold text-sm">
                {category ? getAcronym(category) : ""}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-[4%]">
              {title}
            </h3>
            <p className="text-[9px] text-main-100 whitespace-nowrap truncate">
              {category?.length > 10 ? `${category.slice(0, 10)}...` : category}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-light text-white">
            ${Number(price).toFixed(6)}
          </span>
          <span
            className={`text-sm ${
              isPositive ? "text-green-500" : "text-red-500"
            } `}
          >
            {isPositive ? "+" : ""}
            {Number(priceChange).toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
