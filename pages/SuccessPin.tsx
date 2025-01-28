/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { WalletManager } from '@/lib/WalletManager';
import { useToast } from '@/hooks/use-toast';
import backgroundSvg from '../assets/background.svg';
import UnlockWallet from './UnlockWallet';
import success from '../assets/success.svg';

const SuccessPin: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    try {
      navigate('/secure');
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

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >

      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4">
        <div className='w-full text-center'>
          <img src={success} className="h-[240px] mt-24 mx-auto" alt="Success" />
          <div className='text-[24px] text-[#77E318] w-full text-center mt-4'>
            {location.state.text}
          </div>
        </div>

        <Button
          className="w-[70%] mx-auto bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
          onClick={handleConfirm}
        >
          {location.state.security ? 'Back to Security' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default SuccessPin;