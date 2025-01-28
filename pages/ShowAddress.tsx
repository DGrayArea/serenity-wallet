/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletManager } from '@/lib/WalletManager';
import BackHeader from '@/components/BackHeader';
import backgroundSvg from '../assets/background.svg';
import UnlockWallet from './UnlockWallet';
import { useWalletStore } from '@/stores/walletStore';


const ShowAddress: React.FC = () => {
    const [address, setAddress] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const editAccount = useWalletStore((state) => state.editAccount);
    const navigate = useNavigate();
    const copyAddress = async () => {
        try {
            // Copy address to clipboard
            await navigator.clipboard.writeText(address);
        } catch (err) {
        }
    };

    const getAddress = async () => {
        try {
            setError(null);
            console.log("editAccount", editAccount);
            if (!editAccount) {
                throw new Error("No wallet selected");
            }
            const address = editAccount.publicKey || '';
            console.log("address", address);
            setAddress(address);
        } catch (error: any) {
            setError(error.message || 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkWalletStatus = async () => {
            const locked = WalletManager.isWalletLocked();
            setIsLocked(locked);
            if (!locked) {
                getAddress();
                console.log("Address loaded");
                console.log(address);
            } else {
                setIsLoading(false);
            }
        };

        checkWalletStatus();
    }, []);

    const handleConfirm = async () => {
        navigate('/edit-account');
    };

    const handleUnlock = () => {
        setIsLocked(false);
        setIsLoading(true);
        getAddress();
    };

    if (isLocked) {
        return <UnlockWallet onUnlock={handleUnlock} />;
    }

    if (isLoading) {
        return <div>Generating seed phrase and creating first account...</div>;
    }

    if (error) {
        return (
            <div>
                <h2>Error occurred:</h2>
                <p>{error}</p>
                <Button onClick={() => getAddress()}>Try Again</Button>
            </div>
        );
    }

    return (
        <div
            className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
            style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
            <BackHeader title="Show Seed Phrase" step={0} />

            <div className='relative w-full h-full flex flex-col text-white'>
                <div className='w-full flex flex-col gap-2 my-5 bg-white/10 backdrop-blur-sm border border-[#FFFFFF3D] rounded-lg p-4'>
                    <p className='flex justify-center text-white text-base'>
                        {address}
                    </p>
                </div>
                <Button
                    className="mt-6 w-full h-[50px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF]"
                    style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                    onClick={copyAddress}
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

export default ShowAddress;