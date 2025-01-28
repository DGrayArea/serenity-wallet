import { useState, useEffect } from "react";
import backgroundSvg from "../assets/background.svg";
import BackHeader from "@/components/BackHeader";
import { Button } from "@/components/ui/button";
// import { useWalletStore } from "@/stores/walletStore";
import { useNavigate } from 'react-router-dom';
import { NFTData } from "@/config";
import EmojiPicker, { EmojiClickData, SkinTonePickerLocation, Theme } from 'emoji-picker-react';
import { WalletManager } from "@/lib/WalletManager";
import { useWalletStore } from "@/stores/walletStore";

// import { Connection, PublicKey } from "@solana/web3.js";

export default function EditAccountAvatar() {
    const account = useWalletStore((state) => state.editAccount);
    console.log("editingaccount", account);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("collectibles");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(account?.avatar || null);
    const [searchQuery, setSearchQuery] = useState("");
    // Mock NFT data
    const mockNfts = NFTData;

    // useEffect(() => {
    //     const fetchNFTs = async () => {
    //         try {
    //             const connection = new Connection("https://api.mainnet-beta.solana.com");
    //             const ownerPublicKey = new PublicKey("YOUR_WALLET_ADDRESS");

    //             const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
    //                 programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
    //             });

    //             const nftAccounts = tokenAccounts.value.filter(account => {
    //                 const amount = account.account.data.parsed.info.tokenAmount;
    //                 return amount.decimals === 0 && amount.uiAmount === 1;
    //             });

    //             setNfts(nftAccounts);
    //         } catch (error) {
    //             console.error("Error fetching NFTs:", error);
    //         }
    //     };

    //     fetchNFTs();
    // }, []);
    const filteredNfts = mockNfts.assets.items.filter((nft) =>
        nft.content.metadata.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleClickCollectibles = (url: string) => {
        setAvatarUrl(url);
        console.log(url);
    }
    const handleClickEmojis = (emoji: EmojiClickData) => {
        setAvatarUrl(emoji.getImageUrl());
        console.log(avatarUrl);
    }
    const handleClickDelete = () => {
        setAvatarUrl(null);
    }
    useEffect(() => {
        console.log(avatarUrl);
    }, [avatarUrl]);
    function onSave(): void {
        // Convert null to empty string if avatarUrl is null
        if (account) {
            WalletManager.updateAccountAvatar(account.id || 0, avatarUrl ?? "").then(() => {
                navigate("/edit-account");
            });
        }
    }

    return (
        <div
            className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
            <BackHeader step={0} title="Select Avatar" />
            <div className="flex items-center justify-center mb-4 mt-10">
                <div className="bg-[#8884FF] text-white rounded-full w-40 h-40 flex items-center justify-center relative">
                    {avatarUrl && (
                        <>
                            <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover rounded-full" />
                            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center border-spacing-2 border-4 border-[#1E1A2A]" onClick={handleClickDelete}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-center mt-4 bg-[#1e1a2a28] p-4  w-full max-w-md">
                <div className="flex justify-around mt-4">
                    <button
                        className={`px-4 py-2 ${activeTab === "collectibles" ? "text-[#93EBD3] border-b-2 border-[#93EBD3]" : "text-white"}`}
                        onClick={() => setActiveTab("collectibles")}
                    >
                        Collectibles
                    </button>
                    <button
                        className={`px-4 py-2 flex items-center ${activeTab === "emojis" ? "text-[#93EBD3] border-b-2 border-[#93EBD3]" : "text-white"}`}
                        onClick={() => setActiveTab("emojis")}
                    >
                        Emojis <span className="ml-1">👋</span>
                    </button>
                </div>

                {activeTab === "collectibles" && <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-[#1E1A2A] text-white p-2 rounded-md w-full max-w-md"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>}

                <div className="flex justify-center mt-4">
                    {activeTab === "collectibles" && (
                        <div className="text-white grid grid-cols-2 gap-4">
                            {filteredNfts.slice(0, 3).map((nft) => (
                                <div
                                    key={nft.id}
                                    className="bg-[#1E1A2A] p-2 rounded-md cursor-pointer hover:border hover:border-[#93EBD3]"
                                    onClick={() => handleClickCollectibles(nft.content.links.image)}
                                >
                                    <img src={nft.content.links.image} alt={nft.content.metadata.name} className="w-full h-auto" />
                                    <div className="text-center mt-2">{nft.content.metadata.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === "emojis" && (
                        <div className="text-white"><EmojiPicker theme={Theme.DARK} onEmojiClick={handleClickEmojis} skinTonePickerLocation={SkinTonePickerLocation.PREVIEW} /></div>
                    )}
                </div>
            </div>

            <Button
                className="w-full mt-4 h-[50px] rounded-full bg-gradient-to-r from-[#8884FF] to-[#573CFA] text-white flex justify-center items-center"
                onClick={onSave}
            >
                Save
            </Button>
        </div>
    );
}
