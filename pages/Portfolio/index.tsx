import { useState } from "react";
import backgroundSvg from "@/assets/background.svg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioCard from "./components/PortfolioCard";
import ScrollMenu from "@/components/ui/scrollMenu";
import NetWorthPerformance from "./components/NetWorthPerformance";
import AssetAllocation from "./components/AssetAllocation";
import Holding from "./components/Holding";
import TransactionHistory from "./components/TransactionHistory";
import AddConnectWallet from "@/components/AddConnectWallet";

export default function Portfolio() {
  const [activeMenu, setActiveMenu] = useState<string>("Portfolio");
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const [isAddConnectWallet, setIsAddConnectWallet] = useState<boolean>(false);
  const [manageWallet, setMangeWallet] = useState<boolean>(false);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const handleSideMenuClick = (menu: string) => {
    setStateMenu(menu);
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
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header
        MenuClick={handleSideMenuClick}
        stateAddWallet={stateAddWallet}
        manageWallet={manageWallet}
        setManageWalletState={setManageWalletState}
        className="sticky top-0 z-50"
      />

      <PortfolioCard />
      <main className="flex flex-col flex-grow text-white px-3 pt-6 space-y-6">
        <ScrollMenu activeMenu={activeMenu} onMenuClick={handleMenuClick} />

        {activeMenu === "Portfolio" && <NetWorthPerformance />}

        {activeMenu === "Asset Allocation" && <AssetAllocation />}
        {activeMenu === "Holdings" && <Holding />}

        {activeMenu === "Transaction History" && <TransactionHistory />}
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
      <Navbar className={stateMenu} stateMenu={handleSideMenuClick} manageWallet={setManageWalletState} />
    </div>
  );
}
