import { useEffect, useState } from "react";
import { ChevronDown, QrCode } from "lucide-react";
import Menu from "./../assets/Menu.svg";
import Wallets from "@/components/Wallets";

import { useToast } from "@/hooks/use-toast";
import { useWalletStore } from "@/stores/walletStore";
import QRTab from "./QRTab";

type PropsType = {
  MenuClick: (arg: string) => void;
  handleWallet?: () => void;
  stateAddWallet?: (arg: boolean) => void;
  content?: string;
  className?: string;
  manageWallet?: boolean;
  setManageWalletState?: (arg: boolean) => void;
};

const Header = (props: PropsType) => {
  const [showQRTab, setShowQRTab] = useState<boolean>(false);
  const [isClickQR, setIsClickQR] = useState<boolean>(false);
  const { selectedAccount, fetchAccounts } = useWalletStore();
  // const [manageWallet, setManageWallet] = useState<boolean>(props.manageWallet);
  const { toast } = useToast();

  useEffect(() => {
    fetchAccounts().catch((error) => {
      console.error("Error fetching wallet addresses:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch wallet addresses",
      });
    });
  }, [fetchAccounts, toast]);

  const truncateAddress = (address: string) => {
    return address.length > 13
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  };

  const handleClickMenu = () => {
    props.MenuClick("");
  };

  const handleClickQR = () => {
    setShowQRTab(true);
    setIsClickQR(true);
  };

  const handleClickOutQR = () => {
    if (!isClickQR) {
      setShowQRTab(false);
    }
    setIsClickQR(false);
  };

  const handleWallet = (value: boolean) => {
    props.setManageWalletState(value);
    console.log("Click Wallet");
  };

  const handleAddWallet = () => {
    props.setManageWalletState(false);
    if (props.stateAddWallet) props.stateAddWallet(true);
  };

  const handleSelectWallet = () => {
    props.setManageWalletState(false);
    // setIsWatch(false);
  };

  return (
    <header className={` w-full bg-white bg-opacity-30  ${props.className || ''}`}>
      {
        props.manageWallet ?
          <Wallets handleClose={handleWallet} handleAddWallet={handleAddWallet} handleSelectWallet={handleSelectWallet} />
          : <></>
      }
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={
            "flex items-center h-16 text-white " +
            (props.content ? "" : "justify-between")
          }
        >
          <img
            src={Menu}
            alt="menu"
            className="h-6 w-6 cursor-pointer"
            onClick={handleClickMenu}
          />
          {props.content ? (
            <p>&nbsp;{props.content}</p>
          ) : (
            <>
              <div
                className="text-white flex items-center cursor-pointer"
                onClick={() => handleWallet(true)}
              >
                <div className="flex flex-col justify-center">
                  <div className="bg-gradient-to-r from-[#573CFA] to-[#8884FF] rounded-[50%] p-1 text-xs text-center text-white mr-1">
                    {"A1"}
                  </div>
                </div>
                {selectedAccount
                  ? truncateAddress(selectedAccount.publicKey || "")
                  : "No Address"}{" "}
                <ChevronDown className="ml-2 h-4 w-4 center" />
              </div>
              <QrCode className="h-6 w-6 text-white cursor-pointer" onClick={handleClickQR} />
              {
                showQRTab ?
                  <QRTab className='absolute right-8 top-11' publicKey={selectedAccount ? selectedAccount.publicKey : 'No Address'} onClickOutside={handleClickOutQR} />
                  : <></>
              }
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
