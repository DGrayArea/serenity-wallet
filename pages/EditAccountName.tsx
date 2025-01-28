import backgroundSvg from "../assets/background.svg";
import BackHeader from "@/components/BackHeader";
import { Button } from "@/components/ui/button";
import { useWalletStore } from "@/stores/walletStore";
import { WalletManager } from "@/lib/WalletManager";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { AccountData } from "@/lib/WalletDatabase";



export default function EditAccountName() {
    const { editAccount } = useWalletStore();
    const [account, setAccount] = React.useState<AccountData>({ id: 0, accountName: '' });
    const [accountName, setAccountName] = React.useState('');
    const [originalAccountName, setOriginalAccountName] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        if (editAccount) {
            setAccount(editAccount);
            setAccountName(editAccount.accountName || '');
            setOriginalAccountName(editAccount.accountName || '');
        }
    }, [editAccount]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountName(e.target.value);
    };

    const isSaveDisabled = accountName === originalAccountName || accountName.trim() === '';

    return (
        <div
            className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
            <BackHeader step={0} title="Edit Account Name" />
            <div className="flex flex-col items-center w-full p-4 flex-1">
                <div className="flex justify-between items-center border border-[#FFFFFF3D] bg-[#FFFFFF3D] rounded-md p-2 w-full">
                    <div className="flex flex-col ">
                        <div className="text-[#93EBD3] text-sm">Account Name</div>
                        <input className="text-white bg-transparent border-none outline-none opacity-60 text-base" value={accountName} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            <Button
                className="mt-4 h-[50px] ml-10 mr-10 mb-10 rounded-full bg-gradient-to-r from-[#573CFA] to-[#2F1EB3] text-white flex justify-center items-center"
                onClick={() => {
                    WalletManager.editAccountName(account.id || 0, accountName).then(() => {
                        console.log("account name updated");
                        navigate('/edit-account');
                    });
                }}
                disabled={isSaveDisabled}
            >
                Save Changes
            </Button>
        </div>
    );
}
