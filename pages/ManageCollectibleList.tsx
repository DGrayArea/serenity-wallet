/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { useCollectionStore } from "@/hooks/useCollections";
import Categories from "@/components/Categories";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function ManageCollectibleList() {
  const navigate = useNavigate();
  const { collectibles, toogleCollectibles } = useCollectionStore();
  // const [categories, setCategories] = useState<CollectibleCategory[]>([
  //   { id: "1", name: "Abstract Painting", itemCount: 1, isEnabled: true },
  //   { id: "2", name: "Abstract Painting", itemCount: 1, isEnabled: true },
  //   { id: "3", name: "Abstract Painting", itemCount: 1, isEnabled: false },
  // ]);
  const [groupedCollections, setGroupedCollections] = useState<any>([]);
  const [groupState, setGroupState] = useState<any>([]);

  useEffect(() => {
    const groupCollectibles = async () => {
      if (collectibles) {
        // Filter out burnt NFTs and duplicates first
        const uniqueCollectibles = collectibles.reduce((acc: any[], current: any) => {
          // Skip if burnt
          if (current.burnt) {
            return acc;
          }

          // Check for duplicates based on content
          const isDuplicate = acc.some(item =>
            item.content?.metadata?.name === current.content?.metadata?.name &&
            item.content?.metadata?.description === current.content?.metadata?.description &&
            item.content?.files[0]?.uri === current.content?.files[0]?.uri
          );

          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

        // Group the filtered collectibles
        const groupedData = Object.values(
          uniqueCollectibles.reduce((acc: any, item: any) => {
            const groupValue = item?.grouping[0].group_value;
            if (!acc[groupValue]) {
              acc[groupValue] = {
                group_value: groupValue,
                tokens: [],
              };
            }
            acc[groupValue].tokens.push(item);
            return acc;
          }, {})
        );

        const groupedVal = groupedData?.reduce((acc: any, group: any) => {
          acc[group.group_value] = { isActive: true };
          return acc;
        }, {});

        setGroupedCollections(groupedData);
        setGroupState(groupedVal);
      }
    };
    groupCollectibles();
  }, [collectibles]);

  const handleToggle = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedCollectibles = collectibles.map((item: any) => {
      if (item.grouping?.[0]?.group_value === id) {
        return {
          ...item,
          burnt: !item.burnt // Toggle the burnt state
        };
      }
      return item;
    });

    toogleCollectibles(updatedCollectibles);
  };
  console.log(collectibles);
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364] flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-6 text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg">Manage Collectible List</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative px-4 mb-6">
        <input
          type="text"
          className="w-full bg-[#ffffff0d] backdrop-blur-lg text-white rounded-xl py-3 px-4 pl-4 pr-12
                   border border-[#ffffff26] focus:outline-none focus:border-[#ffffff40]
                   placeholder:text-[#ffffffcc]"
          placeholder="Search collectibles"
        />
        <Search className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5" />
      </div>

      {/* Categories List */}
      <div className="px-4 flex-1">
        {groupedCollections?.map((category: any, index: number) => (
          <Categories
            category={category}
            groupState={groupState}
            key={index}
            handleToggle={handleToggle}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
