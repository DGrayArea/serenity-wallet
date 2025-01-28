import { Card, CardContent } from "@/components/ui/card";
// import { Pill } from "lucide-react";
import defiBg from "@/assets/defi-bg.png";
import PillIcon from "@/assets/pillIcon.png";

interface DefiCardProps {
  title: string;
  category: string;
  logo: string;
}
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

export function DefiCard({ title, category, logo }: DefiCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 group">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${defiBg})` }}
      />
      <div className="absolute inset-0 opacity-50 bg-[url('/placeholder.svg?height=400&width=400')]" />
      <CardContent className="relative p-6 flex flex-col gap-2  h-44">
        <div className="p-2 bg-white/10 backdrop-blur-sm w-fit rounded-full z-20 flex justify-center items-center">
          {logo ? (
            <>
              <img
                src={logo ?? PillIcon}
                alt="Pill Icon"
                className="w-4 h-4 absolute bottom-[-4.5rem] rounded-lg right-2"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;  // Cast e.target to HTMLImageElement
                  img.style.display = "none";

                  const parent = img.parentNode as HTMLElement;  // Cast parentNode to HTMLElement
                  const fallback = parent.querySelector(".acronym");

                  if (fallback) fallback.classList.remove("hidden");
                }}
              />

              <span className="hidden acronym text-white font-semibold text-[8px] absolute bottom-[-4.5rem] right-2 py-2 px-1">
                {getAcronym(title)}
              </span>
            </>
          ) : (
            <span className="acronym text-white font-semibold text-xs absolute py-2 px-1">
              {getAcronym(category)}
            </span>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0  bg-[#0D0913B8] py-5 px-3 backdrop-blur-md flex flex-col gap-1 z-10">
          <h3 className="text-xs font-light text-white">{title}</h3>
          <p className="text-xs font-light text-main-100">{category}</p>
        </div>
      </CardContent>
    </Card>
  );
}
