/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import backgroundSvg from '../assets/background.svg';
import UnlockWallet from './UnlockWallet';
import secure from '../assets/Secure.svg';
import { WalletManager } from '@/lib/WalletManager';
import { useWalletStore } from '@/stores/walletStore';

const SeedPhrase: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setSelectedAccount, setSelectedWallet } = useWalletStore();

  const generateSeedPhrase = async () => {
    try {
      setError(null);
      toast({
        title: 'Success',
        description: 'Seed phrase generated and first account created successfully',
      });
    } catch (error: any) {
      console.error('Error generating seed phrase:', error);
      setError(error.message || 'An unknown error occurred');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate seed phrase and create first account',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      // The seed phrase is already stored during creation, so we just need to navigate
      navigate('/secure/wallet');
    } catch (error: any) {
      console.error('Error confirming seed phrase:', error);
      setError(error.message || 'An unknown error occurred');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to confirm seed phrase',
      });
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setIsLoading(true);
    generateSeedPhrase();
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
        <Button onClick={() => generateSeedPhrase()}>Try Again</Button>
      </div>
    );
  }

  const handleRemind = async () => {
    try {
      const { account } = await WalletManager.createSeedPhrase();
      setSelectedAccount(account);
      setSelectedWallet(account.walletId || 0);
      navigate('/secure/wallet/remind')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
    className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
    style={{ backgroundImage: `url(${backgroundSvg})` }}
  >

      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4">
        <div className='w-full flex flex-col justify-start items-center'>
          <img src={secure} className="h-[130px]" alt="secure" />
          <h1 className='text-2xl text-white font-bold font-sans tracking-widest mt-4'>Secure Your Wallet</h1>
          <p className='text-white opacity-70'>Protect your wallet by saving your seed phrase in a place you trust. It's the only way to recover your wallet if you get locked out or get a new device.</p>
        </div>
        <div className='w-full flex items-center justify-between'>
          <Button className='w-[48%] h-[50px] rounded-full bg-gradient-to-r from-[#FFFFFF]-0 to-[#FFFFFF] text-[17px]-100 text-white border border-solid border-white' onClick={handleRemind}>Remind Me Later</Button>
          <Button className='w-[48%] h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleConfirm}>Secure Now</Button>
        </div>
      </div>
    </div>
  );
};

export default SeedPhrase;