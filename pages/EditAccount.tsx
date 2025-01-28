import backgroundSvg from "../assets/background.svg";
import BackHeader from "@/components/BackHeader";
import { ChevronRight } from "lucide-react";
import manageWallet from "../assets/ManageWallet.svg"
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";
import { useNavigate } from 'react-router-dom';


export default function AccountDetails() {
    const account = useWalletStore((state) => state.editAccount);
    const navigate = useNavigate();
    console.log("account avatar", account);
    return (
        <div
            className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
            <BackHeader step={0} title="About Wallet" />
            <div className="bg-[#1E1A2A] p-4 rounded-md border border-[#8884FF] w-full max-w-md">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-purple-500 text-white rounded-full w-40 h-40 flex items-center justify-center relative">
                        {account?.avatar && <img src={account?.avatar} alt="avatar" className="w-full h-full object-cover rounded-full" />}
                        <div className="absolute bottom-0 right-5 bg-[#8884FF] text-white rounded-full w-10 h-10 flex items-center justify-center border-spacing-2 border-4 border-[#1E1A2A]" onClick={() => { navigate('/edit-account-avatar') }}>
                            <img src={manageWallet} alt="check" className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex justify-between items-center border border-[#FFFFFF3D] rounded-md p-2" onClick={() => { navigate('/edit-account-name') }}>
                        <div className="flex flex-col ">
                            <div className="text-[#93EBD3] text-sm">Account Name</div>
                            <div className="text-white opacity-60 text-base">{account?.accountName}</div>
                        </div>
                        <ChevronRight className="text-white" />
                    </div>
                </div>
                <div
                    className="flex justify-between items-center mb-4 cursor-pointer bg-[#1E1A2A] p-3 rounded-md border border-[#8884FF]"
                    onClick={() => navigate('/show-address')}
                >
                    <div className="text-white">Show Address</div>
                    <ChevronRight className="text-white" />
                </div>
                <div
                    className="flex justify-between items-center mb-4 cursor-pointer bg-[#1E1A2A] p-3 rounded-md border border-[#8884FF]"
                    onClick={() => navigate('/show-private-key')}
                >
                    <div className="text-white">Show Private Key</div>
                    <ChevronRight className="text-white" />
                </div>
                <Button
                    className="w-full mt-4 h-[50px] rounded-full bg-red-600 text-white flex justify-center items-center"
                    onClick={() => { }}
                >
                    Remove Account
                    <span className="ml-2">🗑️</span>
                </Button>
            </div>
        </div>
    );
}
