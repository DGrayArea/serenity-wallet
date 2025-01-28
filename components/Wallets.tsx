import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { WalletManager } from "@/lib/WalletManager";
import manageWallet from "../assets/ManageWallet.svg";
import { useWalletStore } from "@/stores/walletStore";
import { useNavigate } from "react-router-dom";

type PropsType = {
  handleClose: (arg: boolean) => void;
  handleAddWallet: () => void;
  handleSelectWallet: () => void;
};

type AccountType = {
  id: string;
  name: string;
  publicKey: string;
  avatar: string;
};

type WalletType = {
  id: number;
  walletName: string;
  totalBalance: string;
  accounts: AccountType[];
};

const Wallets = (props: PropsType) => {
  const [wallets, setWallets] = useState<WalletType[]>([]);
  const { setSelectedWallet, setSelectedAccount } = useWalletStore();
  const navigate = useNavigate();

  useEffect(() => {
    const getWallets = async () => {
      const wallets = await WalletManager.getWalletsAndAccounts();
      console.log(wallets);
      setWallets(wallets);
    };
    getWallets();
  }, []);

  const handleWalletClick = (walletId: number) => {
    setSelectedWallet(walletId);
    navigate("/wallet-details");
  };

  return (
    <div className="z-100 sticky top-0 w-full h-[600px] bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg border border-[##8884FF] rounded-sm">
      <div className="flex justify-between p-4">
        <X
          color="white"
          className="text-white"
          onClick={() => props.handleClose(false)}
        />
        <p className="text-white text-2xl">Your Accounts</p>
      </div>
      <div className="w-full px-6">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className="rounded-md bg-[#171121] border border-solid border-[#362854] mt-2 p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white text-lg">{wallet.walletName}</p>
                <p className="text-white opacity-60 text-base">
                  {wallet.totalBalance}
                </p>
              </div>
              <img
                src={manageWallet}
                className="h-8 cursor-pointer"
                alt="Manage wallet"
                onClick={() => handleWalletClick(wallet.id)}
              />
            </div>

            <div className="mt-4 space-y-3">
              {wallet.accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex justify-between items-center cursor-pointer pl-2"
                  onClick={() => {
                    setSelectedAccount({
                      accountName: account.name,
                      publicKey: account.publicKey,
                      avatar: account.avatar,
                    });
                    props.handleSelectWallet();
                  }}
                >
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#573CFA] to-[#8884FF] rounded-[50%] p-1 text-xs text-center text-white">
                      {account.avatar && (
                        <img
                          src={account.avatar}
                          alt="Avatar"
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-white text-base">{account.name}</p>
                      <p className="text-white opacity-60 text-sm">
                        {account.publicKey.slice(0, 6)}...
                        {account.publicKey.slice(-4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 w-full bottom-0 absolute">
        <Button
          className="w-full m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]"
          onClick={props.handleAddWallet}
        >
          Add / Connect Wallet
        </Button>
      </div>
    </div>
  );
};

export default Wallets;
