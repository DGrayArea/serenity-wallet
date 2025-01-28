import backgroundSvg from "../assets/background.svg";
import BackHeader from "@/components/BackHeader";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";
import { WalletManager } from "@/lib/WalletManager";
import React from "react";
import { useNavigate } from 'react-router-dom';



export default function WalletDetails() {   
  const { selectedWallet } = useWalletStore();
  const [wallet, setWallet] = React.useState({ id: 0, walletName: '' });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (selectedWallet) {
      WalletManager.getWalletById(selectedWallet).then(walletData => {
        setWallet(walletData);
        console.log(walletData);
      });
    }
  }, [selectedWallet]);
  // Define the type for accounts
  type Account = {
    publicKey: string;
    accountName: string;
    id: number;
    walletId: number;
    avatar: string;
    encryptedPrivateKey: string;
  };

  // Use a state to store accounts with the correct type
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  React.useEffect(() => {
    if (selectedWallet) {
      WalletManager.getAccountsByWalletId(selectedWallet)
        .then((resolvedAccounts) => {
          setAccounts(resolvedAccounts as Account[]);
          console.log(resolvedAccounts);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
        });
    }
  }, [selectedWallet]);

  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="About Wallet" />

      <div className="flex flex-col items-center w-full p-4 flex-1">
      <div className="bg-[#0D09138F] p-4 rounded-md border border-[#8884FF] w-full max-w-md ">
        <div className="mb-4">
          <div className="text-white text-sm">Wallet Information</div>
          <div className="flex justify-between items-center border border-[#FFFFFF3D] bg-[#FFFFFF3D] rounded-md p-2" onClick={() => navigate('/edit-wallet-name')} >
            <div className="flex flex-col ">
              <div className="text-[#93EBD3] text-sm">Wallet Name</div>
              <div className="text-white opacity-60 text-base">{wallet.walletName}</div>
            </div>
            <ChevronRight className="text-white"  />
          </div>
        </div>
        <div
          className="flex justify-between items-center mb-4 cursor-pointer  bg-[#1E1A2A] p-3 rounded-md border border-[#8884FF]"
          onClick={()=>{navigate('/show-seed')}}
        >
          <div className="text-white ">Show Seed Phrase</div>
          <ChevronRight className="text-white" />
        </div>
        <div>
          <div className="text-white text-sm mb-2">Accounts</div>
          {(accounts instanceof Promise ? [] : accounts).map((account: Account) => (
            <div
              key={account.id}
              className="flex justify-between items-center bg-[#1E1A2A] p-3 rounded-md mb-2 cursor-pointer border border-[#8884FF]"
              onClick={() => { useWalletStore.setState({editAccount: account}); navigate('/edit-account')}}
            >
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-[#573CFA] to-[#8884FF] rounded-full p-2 text-xs text-center text-white">
                  {account.accountName.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-white text-base">{account.accountName}</p>
                  <p className="text-white opacity-60 text-sm">$240,746.87</p>
                </div>
              </div>
              <ChevronRight className="text-white" />
            </div>
          ))}
        </div>
        <Button
          className="w-full mt-4 h-[50px] rounded-full bg-red-600 text-white flex justify-center items-center"
          onClick={() => {}}
        >
          Delete Wallet
          <span className="ml-2">🗑️</span>
        </Button>
      </div>
      </div>
    </div>
  );
}
