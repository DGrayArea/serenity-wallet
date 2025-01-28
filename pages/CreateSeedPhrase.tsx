/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletManager } from '@/lib/WalletManager';
import { useToast } from '@/hooks/use-toast';
import BackHeader from '@/components/BackHeader';
import backgroundSvg from '../assets/background.svg';
import UnlockWallet from './UnlockWallet';
import { useWalletStore } from '@/stores/walletStore';

const CreateSeedPhrase: React.FC = () => {
  const [seedPhrase, setSeedPhrase] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isStoring, setIsStoring] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setSelectedAccount, setSelectedWallet } = useWalletStore();

  const generateSeedPhrase = async () => {
    try {
      setError(null);
      const { phrase, account } = await WalletManager.createSeedPhrase();
      setSeedPhrase(phrase);
      setSelectedAccount(account);
      setSelectedWallet(account.walletId || 0);
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

  useEffect(() => {
    const checkWalletStatus = async () => {
      const locked = WalletManager.isWalletLocked();
      setIsLocked(locked);
      if (!locked) {
        generateSeedPhrase();
      } else {
        setIsLoading(false);
      }
    };

    checkWalletStatus();
  }, []);

  const handleConfirm = async () => {
    setIsStoring(true);
    try {
      // The seed phrase is already stored during creation, so we just need to navigate
      navigate('/home', { state: { isWatch: false } });
    } catch (error: any) {
      console.error('Error confirming seed phrase:', error);
      setError(error.message || 'An unknown error occurred');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to confirm seed phrase',
      });
    } finally {
      setIsStoring(false);
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

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} />

      <div className="flex flex-col justify-between flex-1 py-3 px-4">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <h1 className="text-2xl font-bold">Your Seed Phrase</h1>
          <p className="text-sm text-center mb-4">
            Write down these 24 words in order and keep them safe. You'll need them to recover your wallet.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-sm break-all">{seedPhrase}</p>
          </div>
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
          onClick={handleConfirm}
          disabled={isStoring || !seedPhrase}
        >
          {isStoring ? 'Confirming...' : 'Ive written it down'}
        </Button>
      </div>
    </div>
  );
};

export default CreateSeedPhrase;