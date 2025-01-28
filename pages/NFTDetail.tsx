import { useCallback, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import More from "../assets/More.svg";
import ShareIcon from "../assets/ShareIcon.svg";
import UnPin from "../assets/UnPin.svg";
import SendIconAlt from "../assets/SendIconAlt.svg";
import Burn from "../assets/Burn.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import EyeIcon from "../assets/EyeIcon.svg";
import Palette from "../assets/Palette.svg";
import BurnAlt from "../assets/BurnAlt.svg";
import SuccessAvatar from "../assets/SuccessAvatar.svg";
import collectible1 from "@/assets/collectible1.png";
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createBurnCheckedInstruction,
  createCloseAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import axios from "axios";

interface NFTDetails {
  id: string;
  title: string;
  description: string;
  collection: string;
  floorPrice: string;
  uniqueHolders: number;
  network: string;
  website: string;
  isVerified: boolean;
  amount: string;
  timeLeft?: string;
  isSpam?: boolean;
}

const balanceIsNotEnough = false;

const divider = <hr className="border-neutral-400 my-3" />;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const exmpleCollectionData = {
  success: true,
  data: [
    {
      collection_id:
        "abf088cf5739630ab45f28a8aff5b9af62e34a7e109f20ff074e36b222e472bc",
      name: "DeGod",
      symbol: "DGOD",
      floor_price: 8.57817,
      items: 6796,
      marketplaces: [
        "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc",
        "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
        "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN",
        "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu",
      ],
      volumes: 1182.235169793,
      volumes_change_24h: "-72.49",
    },
  ],
  metadata: {},
};
export default function NFTDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nft = location.state?.nft as NFTDetails | any;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isBurnModalOpen, setIsBurnModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [floorPrice, setFloorPrice] = useState<
    typeof exmpleCollectionData | object
  >({});
  const [paidAmount, setPaidAmount] = useState(0);
  const [tokenAccounts] = [
    "44FopWu9p9w4jFqb4BAjEhuJgacpJDjyRpT2ykri62za",
    "FfHTMDUSK1KnxJzAaZYu9hESr1p12k43zqAYRuXo5mC",
    "H1s9wC1dKmyjDzZ5pYfcud8GG2YnqrHBMD9UkcrvgDTS",
  ];

  const burnHandler = useCallback(
    async (
      privateKey: Uint8Array,
      mintAddress: string,
      rpcUrl: string = "https://api.devnet.solana.com"
    ): Promise<{ signature: string; solReceived: number } | undefined> => {
      try {
        const connection = new Connection(rpcUrl, "confirmed");
        const wallet = Keypair.fromSecretKey(privateKey);
        const nftMintAddress = new PublicKey(mintAddress);
        const tokenAccountAddress = await getAssociatedTokenAddress(
          nftMintAddress,
          wallet.publicKey
        );

        const preBalance = await connection.getBalance(wallet.publicKey);

        const burnInstruction = createBurnCheckedInstruction(
          tokenAccountAddress,
          nftMintAddress,
          wallet.publicKey,
          1,
          0
        );

        const closeAccountInstruction = createCloseAccountInstruction(
          tokenAccountAddress,
          wallet.publicKey,
          wallet.publicKey
        );

        const transaction = new Transaction().add(
          burnInstruction,
          closeAccountInstruction
        );
        const signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [wallet]
        );

        const postBalance = await connection.getBalance(wallet.publicKey);
        const solReceived = (postBalance - preBalance) / LAMPORTS_PER_SOL;

        return { signature, solReceived };
      } catch (error) {
        console.error("Error burning NFT:", error);
      }
    },
    []
  );

  useEffect(() => {
    const getFloor = async () => {
      try {
        if (nft.id) {
          // const response = await axios.post(
          //   `${apiEndpoint}/api/nfts/floorprice`,
          //   {
          //     collectionId: nft?.id,
          //   }
          // );
          const response = await axios.get(
            `https://pro-api.solscan.io/v2.0/nft/collection/lists?range=1&sort_order=desc&sort_by=volumes&page=1&page_size=10&collection=${nft?.id}`,
            {
              headers: { token: import.meta.env.VITE_SOLSCAN_API_KEY },
            }
          );

          setFloorPrice(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFloor();
  }, [nft]);

  async function handleBurn(mintAddress: string) {
    try {
      const result = await burnHandler(
        import.meta.env.VITE_PRIVATE_KEY,
        mintAddress,
        import.meta.env.VITE_DEVNET
      );

      if (result) {
        setPaidAmount(result.solReceived);
        // alert(`Successfully burned NFT: ${result.signature}`);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error(error);
      // alert("Error while burning NFT.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364] relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>NFT</span>
        </button>
      </div>

      {/* NFT Image */}
      <div className="relative px-4">
        <div className="aspect-square w-full rounded-2xl bg-[#050505] overflow-hidden">
          <img
            src={nft?.content?.files?.[0]?.uri || collectible1}
            alt="NFT"
            className="w-full h-full object-contain"
          />
          {nft?.isSpam && (
            <div className="absolute top-4 left-4 bg-system-text-system-danger text-white text-xs px-2 py-1 rounded">
              SPAM
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-2 px-4 mt-4">
        <button className="flex flex-col items-center justify-center gap-2 py-3 bg-neutral-500 rounded-lg" onClick={() => navigate('/send/input-address', { state: { nft, floorPrice } })}>
          <img src={SendIconAlt} alt="Send" />
          <span className="text-white text-xs font-light">Send</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-3 bg-neutral-500 rounded-lg">
          <img src={UnPin} alt="Unpin" />
          <span className="text-white text-xs font-300">Unpin</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-3 bg-neutral-500 rounded-lg">
          <img src={ShareIcon} alt="Share" />
          <span className="text-white text-xs font-300">Share</span>
        </button>
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="flex flex-col items-center justify-center gap-2 py-3 bg-neutral-500 rounded-lg"
        >
          <img src={More} alt="More" />
          <span className="text-white text-xs font-300">More</span>
        </button>
      </div>

      {/* NFT Details */}
      <div className="px-4 mt-6">
        <div className="bg-[#171121] rounded-xl p-4 border border-main-300">
          <h3 className="text-main-100 text-xs mb-4">Description</h3>
          <p className="text-white mb-4">
            {nft?.content?.metadata?.description?.length > 40
              ? `${nft.content.metadata.description.slice(0, 40)}...`
              : nft?.content?.metadata?.description || "No Description"}
          </p>
          {divider}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-main-100">Collection</span>
              <span className="text-white">
                {nft.content.metadata.name || "Get your Wifff"}
              </span>
            </div>
            {divider}

            <div className="flex justify-between">
              <span className="text-main-100">Floor Price</span>
              <span className="text-white">
                {/**@ts-expect-error expect */}
                {floorPrice?.data && floorPrice?.data?.data?.length > 0
                  ? /**@ts-expect-error expect */
                  floorPrice?.data?.data[0]?.floor_price < 0.00023
                    /**@ts-expect-error expect */
                    ? floorPrice?.data?.data[0]?.floor_price
                    : "<0.00023"
                  : "0"}{" "}
                SOL
              </span>
            </div>
            {divider}
            <div className="flex justify-between">
              <span className="text-main-100">Unique Holders</span>
              <span className="text-white">
                {String(nft.supply.print_current_supply).toLocaleString() ||
                  "234,567"}
              </span>
            </div>
            {divider}
            <div className="flex justify-between">
              <span className="text-main-100">Network</span>
              <span className="text-white">Solana</span>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="mt-9">
          <h3 className="text-main-100 mb-3 font-medium">Properties</h3>
          <div className="flex flex-col gap-2">
            {/* First row */}
            <div className="flex gap-2 flex-wrap">
              {
                nft?.content?.metadata?.attributes?.length &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                nft?.content?.metadata?.attributes?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex-[2] bg-select-bg border border-main-300 bg-opacity-25 rounded-lg p-3 w-fit"
                  >
                    <span className="text-white/60 text-sm block capitalize whitespace-nowrap">
                      {item.trait_type}
                    </span>
                    <span className="text-white text-sm whitespace-nowrap">
                      {item.value}
                    </span>
                  </div>
                ))}
              {/* Website */}
              {/* <div className="flex-[2] bg-select-bg border border-main-300 bg-opacity-25 rounded-lg p-3">
                <span className="text-white/60 text-sm block">Website</span>
                <span className="text-white text-sm">https:5000wif.com</span>
              </div> */}
              {/* Verified */}
              {/* <div className="flex-1 bg-select-bg border border-main-300 bg-opacity-25 rounded-lg p-3">
                <span className="text-white/60 text-sm block">Verified</span>
                <span className="text-white text-sm">True</span>
              </div> */}
              {/* Amount */}
              {/* <div className="flex-1 bg-select-bg border border-main-300 bg-opacity-25 rounded-lg p-3">
                <span className="text-white/60 text-sm block">Amount</span>
                <span className="text-white text-sm">5,000 WIF</span>
              </div> */}
            </div>
            {/* Second row */}
            {/* <div className="flex">
              <div className="flex flex-col bg-select-bg border border-main-300 bg-opacity-25 rounded-lg p-3">
                <span className="text-white/60 text-sm block">Time Left</span>
                <span className="text-white text-sm">55 minutes left!</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Add Bottom Sheet */}
      {isBottomSheetOpen && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsBottomSheetOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#171121]/70 backdrop-blur-lg rounded-t-[20px] p-5 z-50 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 text-white px-4 py-3 border border-main-300 rounded-lg">
                <img src={Palette} alt="Set as Anchor" />
                <span>Set as Anchor</span>
              </button>

              <button className="w-full flex items-center gap-3 text-white px-4 py-3 border border-main-300 rounded-lg">
                <img src={ArrowDown} alt="Save to Gallery" />
                <span>Save to Gallery</span>
              </button>

              <button className="w-full flex items-center gap-3 text-white px-4 py-3 border border-main-300 rounded-lg">
                <img src={EyeIcon} alt="Hide Collection" />
                <span>Hide Collection</span>
              </button>

              <button
                className="w-full flex items-center gap-3 text-system-danger px-4 py-3 border border-system-danger rounded-lg"
                onClick={() => {
                  setIsBottomSheetOpen(false);
                  setIsBurnModalOpen(true);
                }}
              >
                <img src={Burn} alt="Burn" />
                <span>Burn NFT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Burn Bottom Sheet */}
      {isBurnModalOpen && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsBurnModalOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#171121]/70 backdrop-blur-lg rounded-t-[20px] p-5 z-50 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <div className="nft-title font-medium text-white text-xl text-center">
              Abstract Painting
            </div>
            <div className="h-56 w-full pb-6 pt-2">
              <img
                src={nft?.content?.files?.[0]?.uri || collectible1}
                alt="NFT"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div className="text-center space-y-2 mb-6">
              <h2 className="text-white text-2xl font-medium">
                Burn this NFT?
              </h2>
              <p className="text-system-danger text-sm font-semibold">
                Burning this NFT will remove it from your wallet permanently.
                You can't restore the file.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-main-100">SOL Balance:</span>
                <span className="text-white font-semibold text-sm">
                  0.0238590 SOL
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-main-100">Burn fee:</span>
                <span className="text-white font-semibold text-sm">
                  0.000340 SOL
                </span>
              </div>
              {balanceIsNotEnough && (
                <div className="text-system-danger text-sm flex items-start gap-2 mt-4">
                  <span className="text-lg">ⓘ</span>
                  <span>
                    You don't have enough SOL balance in your wallet to burn
                    this NFT.
                  </span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsBurnModalOpen(false)}
                className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white"
              >
                Cancel
              </button>
              <button
                className={`flex-1 flex items-center justify-center py-3 px-6 rounded-full bg-system-danger text-white ${balanceIsNotEnough ? "opacity-50" : ""
                  }`}
                disabled={balanceIsNotEnough}
                onClick={() => {
                  setIsBurnModalOpen(false);
                  handleBurn(tokenAccounts[0]);
                }}
              >
                <span className="flex items-center gap-2">
                  Burn
                  <img src={BurnAlt} alt="Burn" className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Success Bottom Sheet */}
      {isSuccessModalOpen && (
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsSuccessModalOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-[#171121]/70 backdrop-blur-lg rounded-t-[20px] p-5 z-50 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

            <h2 className="text-white text-2xl font-medium text-center py-4">
              NFT Burn Successful!
            </h2>

            <div className=" h-56 w-full">
              <img
                src={SuccessAvatar}
                alt="Success"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center space-y-2 mb-6">
              <p className="font-light text-white">
                You've paid {paidAmount} SOL to burn
                <br />
                "Abstract Painting"
              </p>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                navigate(-1); // Optional: navigate back after success
              }}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-l from-[#8884FF] to-[#573CFA] text-white font-medium"
            >
              Great
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
