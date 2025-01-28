import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PinIcon from "@/assets/PinIcon.svg";
import qrIcon from "@/assets/qr-icon.svg";
import { Button } from "@/components/ui/button";
import collectible1 from "@/assets/collectible1.png";
import { useCollectionStore } from "@/hooks/useCollections";
import { WalletManager } from "@/lib/WalletManager";

interface NFTDisplayProps {
  searchQuery: string;
}

const NFTDisplay = ({ searchQuery }: NFTDisplayProps) => {
  const { collectibles, toggledStates, setCollectibles } = useCollectionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const placeholderImage = collectible1;

  const handleManageList = () => {
    navigate("/manage-collectibles");
  };

  const fetchNFTs = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError("");
    try {
      const NFTdata = await WalletManager.getNFTs("38L6Zc8yACT5TZDPYjgwZLDcmAqrexKhX5XvE1A417Lk");
      const fetchedNFTs = NFTdata || [];
      const uniqueData = Array.from(
        new Map(
          fetchedNFTs?.map((item: { content?: { files: [{ uri: string }] } }) => [
            item?.content?.files[0].uri,
            item,
          ])
        ).values()
      );

      setCollectibles(uniqueData);
      setHasMore(uniqueData.length > 0);
    } catch (err) {
      console.error("Failed to fetch NFTs:", err);
      setError("Failed to fetch NFTs");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, setCollectibles]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredCollectibles = collectibles?.reduce((acc: any, current: any) => {
    const collectionId = current.grouping?.[0]?.group_value;
    if (toggledStates[collectionId] === false || current.burnt) {
      return acc;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isDuplicate = acc.some((item: any) =>
      item.content.metadata.name === current.content.metadata.name &&
      item.content.metadata.description === current.content.metadata.description &&
      item.content.files[0]?.uri === current.content.files[0]?.uri
    );

    const matchesSearch = searchQuery.toLowerCase() === '' ||
      current.content?.metadata?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      current.content?.metadata?.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!isDuplicate && matchesSearch) {
      acc.push(current);
    }
    return acc;
  }, []);

  console.log(collectibles);
  return (
    <div>


      {collectibles?.length === 0 && !loading && !error && (
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-white/90 text-lg mb-3">
            Add collectibles by tapping{" "}
            <img src={qrIcon} alt="QR" className="w-5 h-5 inline-block mx-1" />
          </p>
          <Button
            variant="outline"
            className="mt-4 px-8 py-2 rounded-full border border-[#ffffff26] bg-[#ffffff0d] 
               text-white/90 hover:bg-[#ffffff1a] transition-colors"
            onClick={handleManageList}
          >
            Manage List
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">

        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredCollectibles?.map((item: any, index: number) => (
            <div
              key={`${item.id}-${index}`}
              className="relative aspect-square rounded-2xl overflow-hidden bg-black cursor-pointer"
              onClick={() =>
                navigate("/nft-detail", {
                  state: { nft: item },
                })
              }
            >
              <div className="absolute inset-0 z-10"></div>
              <img
                src={item?.content?.files?.[0]?.uri || placeholderImage}
                alt={item?.content?.metadata?.name || "NFT Image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                <div className="flex items-center gap-2 text-white bg-glassCard-secondary rounded-lg p-2 w-fit">
                  <img src={PinIcon} alt="claim" className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {item?.claimText || "Claim"}
                  </span>
                </div>
              </div>
              <div className="absolute top-3 right-3 text-white/60 text-sm z-20">
                {item?.content?.metadata?.name || "No Name"}
              </div>
              <div className="absolute bottom-10 left-3 text-white text-xs z-20">
                {item?.content?.metadata?.description?.length > 30
                  ? `${item.content.metadata.description.slice(0, 30)}...`
                  : item?.content?.metadata?.description || "No Description"}
              </div>
            </div>
          ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default NFTDisplay;