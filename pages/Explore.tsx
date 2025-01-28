import ExploreHeader from "@/components/ExploreHeader";
import ExploreContent from "@/components/ExploreContent";
import Footer from "@/components/Footer";
import { useState } from "react";
import backgroundSvg from "../assets/background.svg";

type TabType = "sites" | "news" | "tokens" | "collections";

export default function Explore() {
  const [activeTab, setActiveTab] = useState<TabType>("sites");

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <ExploreHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="sticky top-0 z-50 backdrop-blur-md "
      />

      <div className="flex-1">
        <ExploreContent activeTab={activeTab} />
      </div>
      <Footer className="sticky bottom-0 z-50" />
    </div>
  );
}
