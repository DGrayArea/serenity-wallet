/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletManager } from '@/lib/WalletManager';
import BackHeader from '@/components/BackHeader';
import backgroundSvg from '../assets/background.svg';
import UnlockWallet from './UnlockWallet';
import { useWalletStore } from '@/stores/walletStore';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

const ShowSeedPhrase: React.FC = () => {
    const [seedPhrase, setSeedPhrase] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLocked, setIsLocked] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const selectedWalletId = useWalletStore((state) => state.selectedWallet);
    const navigate = useNavigate();
    const [revealed, setRevealed] = useState(false);
    const copySeedPhrase = async () => {
        try {
            // Copy seed to clipboard
            await navigator.clipboard.writeText(seedPhrase);
        } catch (err) {
        }
    };
    const handleRevealSeed = () => {
        setRevealed(true);
    }

    const getSeedPhrase = async () => {
        try {
            setError(null);
            console.log("selectedWalletId", selectedWalletId);
            if (!selectedWalletId) {
                throw new Error("No wallet selected");
            }
            const phrase = await WalletManager.getSeedPhraseById(selectedWalletId);
            console.log("phrase", phrase);
            setSeedPhrase(phrase);
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
                getSeedPhrase();
                console.log("Seed phrase loaded");
                console.log(seedPhrase);
            } else {
                setIsLoading(false);
            }
        };

        checkWalletStatus();
    }, []);

    const handleConfirm = async () => {
        navigate('/wallet-details');
    };

    const handleUnlock = () => {
        setIsLocked(false);
        setIsLoading(true);
        getSeedPhrase();
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
                <Button onClick={() => getSeedPhrase()}>Try Again</Button>
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
                <div className='w-full flex flex-col gap-2 my-5 bg-black/70 backdrop-blur-sm rounded-lg p-4'>
                    <p className='flex justify-center text-2xl font-semibold text-center text-red-500'>Do not share your seed phrase</p>
                    <p className='flex justify-center text-red-500 text-base'>
                        <AlertCircle className='text-red-500' />
                        Your seed phrase is your private address.
                        Do not let anyone see your seed phrase or share your seed phrase to anyone.
                    </p>
                </div>
                <div className='relative w-full grid grid-cols-3 gap-2 p-4 rounded-lg border border-white backdrop-blur-sm overflow-hidden'>
                    <div className={cn('absolute inset-0 z-50 w-full h-full flex flex-col justify-center items-center bg-black/60 backdrop-blur-[4px] cursor-pointer', revealed && 'hidden')} onClick={handleRevealSeed}>
                        <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35.8125 26.7922C35.7177 26.8475 35.6097 26.8761 35.5 26.875C35.3901 26.8752 35.2821 26.8464 35.187 26.7915C35.0918 26.7367 35.0127 26.6577 34.9578 26.5625L31.6531 20.7813C29.6887 22.2134 27.4647 23.2498 25.1047 23.8328L26.125 29.8969C26.1521 30.0604 26.1132 30.2279 26.0168 30.3627C25.9204 30.4975 25.7744 30.5885 25.6109 30.6157C25.5763 30.6217 25.5413 30.6248 25.5062 30.625C25.3585 30.6248 25.2156 30.5723 25.1029 30.4768C24.9902 30.3812 24.915 30.2489 24.8906 30.1032L23.889 24.0875C21.6512 24.4708 19.3644 24.4708 17.1265 24.0875L16.125 30.1032C16.1003 30.2505 16.0238 30.3841 15.9091 30.4798C15.7945 30.5756 15.6493 30.6271 15.5 30.625C15.4649 30.6248 15.4299 30.6217 15.3953 30.6157C15.2318 30.5885 15.0859 30.4975 14.9895 30.3627C14.8931 30.2279 14.8541 30.0604 14.8812 29.8969L15.8937 23.8297C13.5345 23.2474 11.311 22.2121 9.34685 20.7813L6.04217 26.5625C5.98723 26.6577 5.90819 26.7367 5.813 26.7915C5.71781 26.8464 5.60985 26.8752 5.49998 26.875C5.39026 26.8761 5.28229 26.8475 5.18748 26.7922C5.1162 26.7513 5.0537 26.6966 5.00357 26.6315C4.95343 26.5663 4.91664 26.4919 4.8953 26.4125C4.87397 26.3331 4.8685 26.2503 4.87923 26.1688C4.88995 26.0873 4.91665 26.0087 4.95779 25.9375L8.34529 20.0094C7.12262 19.0033 6.00636 17.8745 5.01404 16.6407C4.95578 16.5777 4.9111 16.5035 4.88276 16.4226C4.85443 16.3416 4.84305 16.2557 4.84934 16.1702C4.85563 16.0847 4.87944 16.0014 4.91931 15.9255C4.95918 15.8495 5.01424 15.7826 5.08108 15.7289C5.14791 15.6752 5.22508 15.6358 5.3078 15.6132C5.39051 15.5906 5.47699 15.5852 5.56187 15.5974C5.64674 15.6097 5.72818 15.6393 5.80114 15.6843C5.87409 15.7294 5.93699 15.789 5.98592 15.8594C8.66404 19.1735 13.3578 23.125 20.5 23.125C27.6422 23.125 32.3359 19.1735 35.014 15.8578C35.063 15.7874 35.1259 15.7278 35.1988 15.6828C35.2718 15.6377 35.3532 15.6081 35.4381 15.5959C35.523 15.5836 35.6094 15.589 35.6922 15.6116C35.7749 15.6342 35.852 15.6736 35.9189 15.7274C35.9857 15.7811 36.0408 15.848 36.0806 15.9239C36.1205 15.9998 36.1443 16.0831 36.1506 16.1686C36.1569 16.2542 36.1455 16.3401 36.1172 16.421C36.0889 16.5019 36.0442 16.5762 35.9859 16.6391C34.9936 17.8729 33.8773 19.0018 32.6547 20.0078L36.0422 25.9375C36.0833 26.0087 36.11 26.0873 36.1207 26.1688C36.1315 26.2503 36.126 26.3331 36.1047 26.4125C36.0833 26.4919 36.0465 26.5663 35.9964 26.6315C35.9463 26.6966 35.8838 26.7513 35.8125 26.7922Z" fill="white" />
                        </svg>
                        <p className='text-center text-base font-semibold mt-4 mb-2'>
                            Tap to reveal <br />
                            your seed phrase
                        </p>
                        <p className='text-center'>
                            Make sure no one <br />
                            is watching your screen.
                        </p>
                    </div>
                    {
                        seedPhrase.split(' ').map((s, index) => (
                            <div key={index} className='rounded bg-white text-black h-9 flex justify-center items-center'>
                                {`${index + 1}. ${s}`}
                            </div>
                        ))
                    }
                </div>
                <Button
                    className="mt-6 w-full h-[50px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF]"
                    style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                    onClick={copySeedPhrase}
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

export default ShowSeedPhrase;