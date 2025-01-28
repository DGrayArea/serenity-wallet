import backgroundSvg from "../assets/background.svg";
import BackHeader from "@/components/BackHeader";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";
import { WalletManager } from "@/lib/WalletManager";
import React from "react";
import { useNavigate } from 'react-router-dom';



export default function EditWalletName() {
    const { selectedWallet } = useWalletStore();
    const [wallet, setWallet] = React.useState({ id: 0, walletName: '' });
    const [walletName, setWalletName] = React.useState('');
    const [originalWalletName, setOriginalWalletName] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (selectedWallet) {
            WalletManager.getWalletById(selectedWallet).then(walletData => {
                setWallet(walletData);
                setWalletName(walletData.walletName);
                setOriginalWalletName(walletData.walletName);
            });
        }
    }, [selectedWallet]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalletName(e.target.value);
    };

    const isSaveDisabled = walletName === originalWalletName || walletName.trim() === '';

    return (
        <div
            className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
            <BackHeader step={0} title="Edit Wallet Name" />
            <div className="flex flex-col items-center w-full p-4 flex-1">
                <div className="flex justify-between items-center border border-[#FFFFFF3D] bg-[#FFFFFF3D] rounded-md p-2 w-full">
                    <div className="flex flex-col ">
                        <div className="text-[#93EBD3] text-sm">Wallet Name</div>
                        <input className="text-white bg-transparent border-none outline-none opacity-60 text-base" value={walletName} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            <Button
                className="mt-4 h-[50px] ml-10 mr-10 mb-10 rounded-full bg-gradient-to-r from-[#573CFA] to-[#2F1EB3] text-white flex justify-center items-center"
                onClick={() => {
                    WalletManager.editWalletName(wallet.id, walletName).then(() => {
                        navigate('/wallet-details');
                    });
                }}
                disabled={isSaveDisabled}
            >
                Save Changes
            </Button>
        </div>
    );
}
