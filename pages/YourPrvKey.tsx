/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletManager } from '@/lib/WalletManager';
import BackHeader from '@/components/BackHeader';
import backgroundSvg from '../assets/background.svg';
import { useWalletStore } from '@/stores/walletStore';
import { AlertCircle } from 'lucide-react';


const ShowPrivateKey: React.FC = () => {
    const [privateKey, setPrivateKey] = useState<string>('');
    const editAccount = useWalletStore((state) => state.editAccount);
    const navigate = useNavigate();
    const copyPrivateKey = async () => {
        try {
            // Copy address to clipboard
            await navigator.clipboard.writeText(privateKey);
        } catch (err) {
        }
    };

    const getPrivateKey = async () => {
        try {
            console.log("editAccount", editAccount);
            if (!editAccount) {
                throw new Error("No wallet selected");
            }
            const privateKey = await WalletManager.exportAccountPrivateKey(editAccount.publicKey || '');
            console.log("privateKey", privateKey);
            setPrivateKey(privateKey);
        } catch (error: any) {
            console.error("Error getting private key", error);
        }
    };

    useEffect(() => {
        const checkWalletStatus = async () => {
            const locked = WalletManager.isWalletLocked();
            if (!locked) {
                getPrivateKey();
                console.log("Private Key loaded");
                console.log(privateKey);
            }
        };

        checkWalletStatus();
    }, []);

    const handleConfirm = async () => {
        navigate('/edit-account');
    };


    return (
        <div
            className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
            <BackHeader title="Show Seed Phrase" step={0} />

            <div className='relative w-full h-full flex flex-col text-white'>
                <div className='w-full flex flex-col gap-2 my-5 bg-black/70 backdrop-blur-sm rounded-lg p-4'>
                    <p className='flex justify-center text-2xl font-semibold text-center text-red-500'>Do not share your private key</p>
                    <p className='flex justify-center text-red-500 text-base'>
                        <AlertCircle className='text-red-500' />
                        Your private key is your private address. Do not let anyone see your wallet key or share your wallet key to anyone
                    </p>
                </div>
                <div className='w-full flex flex-col gap-2 my-5 bg-white/10 backdrop-blur-sm border border-[#FFFFFF3D] rounded-lg p-4'>
                    <p className='flex justify-center text-white text-base break-all'>
                        {privateKey}
                    </p>
                </div>
                <Button
                    className="mt-6 w-full h-[50px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF]"
                    style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                    onClick={copyPrivateKey}
                >
                    Copy to clipboard
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.3875 2.80005H7.94212C7.77234 2.80005 7.63341 2.93995 7.63341 3.11091V7.22955H3.60877C3.43898 7.22955 3.30005 7.3694 3.30005 7.54036V24.8892C3.30005 25.0602 3.43898 25.2001 3.60877 25.2001H21.058C21.2278 25.2001 21.3667 25.0602 21.3667 24.8892V20.7706H25.3913C25.5611 20.7706 25.7001 20.6307 25.7001 20.4597V3.11091C25.7001 2.93995 25.5611 2.80005 25.3913 2.80005H25.3875ZM20.7493 24.5784H3.91748V7.84733H20.7493V24.5784ZM25.0788 20.1489H21.359V7.53652C21.359 7.36555 21.22 7.22566 21.0503 7.22566H8.24312V3.41394H25.075V20.145L25.0788 20.1489Z" fill="white" />
                    </svg>
                </Button>
                <div className='absolute bottom-0 w-full p-5'>
                    <Button
                        className="w-full h-[50px] rounded-full hover:bg-purple-700"
                        style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
                        onClick={handleConfirm}
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ShowPrivateKey;