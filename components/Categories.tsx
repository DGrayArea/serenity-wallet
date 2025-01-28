/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useCollectionStore } from "@/hooks/useCollections";

function truncateSolAddress(address: string, length = 4): string {
  if (address.length <= length * 2 + 3) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

interface CategoriesProps {
  category: any;
  groupState: any;
  handleToggle: (id: string) => void;
}

export default function Categories({
  category,
  handleToggle,
}: CategoriesProps) {
  const { toggledStates, updateToggleState } = useCollectionStore();
  const [, setDetails] = useState<any>({});

  // Use the persistent state from the store
  const isToggled = toggledStates[category?.group_value] ?? true;

  useEffect(() => {
    const getDetails = async () => {
      const details = await axios.get(
        `https://pro-api.solscan.io/v2.0/nft/collection/lists?range=1&sort_order=desc&sort_by=volumes&page=1&page_size=10&collection=${category?.group_value}`,
        { headers: { token: import.meta.env.VITE_SOLSCAN_API_KEY } }
      );
      if (details.data.data[0] > 0) {
        setDetails(details.data);
      } else {
        const json = {
          group_value: category.group_value,
          tokens: [...category.tokens],
          collection_id: "",
          name: "Unkown",
          symbol: "Unkown",
          floor_price: 0,
          items: 0,
          marketplaces: [],
          volumes: 0,
          volumes_change_24h: "0",
        };
        setDetails(json);
      }
    };
    getDetails();
  }, [category]);

  // Get the first token's image from the category
  const firstTokenImage = category.tokens[0]?.content?.files?.[0]?.uri;

  return (
    <div className="mb-4 bg-[#ffffff0d] backdrop-blur-lg rounded-xl p-4 border border-[#ffffff26] w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-black">
            {firstTokenImage && (
              <img
                src={firstTokenImage}
                alt={category.group_value}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">
              {truncateSolAddress(category.group_value) || "Unknown"}
            </h3>
            <p className="text-white/60 text-sm">
              {category.tokens.length} Items
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const newState = !isToggled;
            updateToggleState(category?.group_value, newState);
            handleToggle(category?.group_value);
          }}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isToggled ? "bg-[#573CFA]" : "bg-gray-600"
            }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-200 ease-in-out ${isToggled ? "translate-x-6" : "translate-x-0"
              }`}
          />
        </button>
      </div>
    </div>
  );
}