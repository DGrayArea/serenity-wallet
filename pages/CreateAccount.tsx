import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { WalletManager } from "@/lib/WalletManager";
import { useWalletStore } from "@/stores/walletStore";
import { useNavigate } from "react-router-dom";
import { AccountData } from "@/lib/WalletDatabase";

export default function CreateAccount() {

  const [accountName, setAccountName] = useState<string>('');
  const { setSelectedAccount, selectedAccount } = useWalletStore();
  const navigate = useNavigate();

  const handleCreate = async () => {
    const account: AccountData = await WalletManager.addAccount(accountName, selectedAccount?.walletId || 0);
    setSelectedAccount(account);
    navigate('/home', { state: { isWatch: false } })
  }

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Create Wallet" />

      <div className="w-full flex flex-col justify-between flex-1 p-4 text-red">
        <div className="relative w-full mt-5 focus:border-none">
          <input type="text" className="bg-gray-50 bg-opacity-5 border border-gray-300 text-white text-md rounded-lg block w-full ps-3 p-4" value={accountName} placeholder="Search" onChange={(e) => setAccountName(e.target.value)} />
          <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
            <X className='text-white' onClick={() => setAccountName('')} />
          </button>
        </div>

        <Button className='w-full h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleCreate}>Create</Button>
      </div>
    </div>
  );
}