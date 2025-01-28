import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CollectibleList from "@/components/CollectibleList";
import backgroundSvg from "../assets/background.svg";
import AddConnectWallet from "@/components/AddConnectWallet";


export default function Collectibles() {
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const [isAddConnectWallet, setIsAddConnectWallet] = useState<boolean>(false);
  const [manageWallet, setMangeWallet] = useState<boolean>(false);

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
  };

  const handleManageList = () => {
    navigate("/manage-collectibles");
  };

  const stateAddWallet = (state: boolean) => {
    setIsAddConnectWallet(state);
  };

  const setManageWalletState = (state: boolean) => {
    setMangeWallet(state);
    setStateMenu('hidden');
  }

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header
        MenuClick={handleMenuClick}
        stateAddWallet={stateAddWallet}
        manageWallet={manageWallet}
        setManageWalletState={setManageWalletState}
        className="sticky top-0 z-50"
      />

      <main className="flex-1 px-4 py-6">
        {/* Search Bar */}
        <div className="relative w-full mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#ffffff0d] backdrop-blur-lg text-white rounded-xl py-3 px-4 pl-4 pr-12
                     border border-[#ffffff26] focus:outline-none focus:border-[#ffffff40]
                     placeholder:text-[#ffffffcc]"
            placeholder="Search collectibles"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5" />
        </div>

        <CollectibleList searchQuery={searchQuery} />
        <div className=" w-full flex justify-center py-4">
          <Button
            variant="outline"
            className="mt-4 px-8 py-2 rounded-full border border-[#ffffff26] bg-[#ffffff0d] 
                       text-white/90 hover:bg-[#ffffff1a] transition-colors"
            onClick={handleManageList}
          >
            Manage List
          </Button>
        </div>
      </main>

      <Footer className="sticky bottom-0 z-50" />
      {isAddConnectWallet ? (
        <AddConnectWallet
          handleCancel={() => {
            setIsAddConnectWallet(false);
          }}
        />
      ) : (
        <></>
      )}
      <Navbar className={stateMenu} stateMenu={handleMenuClick} manageWallet={setManageWalletState} />
    </div>
  );
}
