import React, { useState, useEffect, useMemo } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, CheckCircle } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';

const SOLANA_NETWORK = 'https://api.devnet.solana.com';

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const { selectedAccount } = useWalletStore();
  const { toast } = useToast();

  const connection = useMemo(() => new Connection(SOLANA_NETWORK, 'confirmed'), []);

  useEffect(() => {
    if (!selectedAccount?.publicKey) {
      setBalance(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const fetchBalance = async () => {
      try {
        const publicKey = new PublicKey(selectedAccount?.publicKey || '');
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch balance',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalance();

    const id = connection.onAccountChange(
      new PublicKey(selectedAccount?.publicKey),
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      'confirmed'
    );

    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, [selectedAccount?.publicKey, connection, toast]);

  const handleCopyAddress = () => {
    if (selectedAccount?.publicKey) {
      navigator.clipboard.writeText(selectedAccount?.publicKey)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
          toast({
            title: 'Success',
            description: 'Address copied to clipboard',
          });
        })
        .catch((error) => {
          console.error('Failed to copy address:', error);
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to copy address',
          });
        });
    }
  };

  const truncateAddress = (address: string) => {
    return address.length > 13 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 w-full max-w-sm">
      <h2 className="text-2xl font-bold text-white mb-4">Current Balance</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-20">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      ) : balance !== null ? (
        <p className="text-4xl font-bold text-white mb-4">{balance.toFixed(4)} SOL</p>
      ) : (
        <p className="text-xl text-white mb-4">No wallet selected</p>
      )}
      {selectedAccount?.publicKey && (
        <div className="flex items-center justify-between bg-white bg-opacity-20 rounded p-2">
          <span className="text-white">{truncateAddress(selectedAccount?.publicKey)}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyAddress}
            className="text-white hover:text-gray-200"
          >
            {isCopied ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Copy className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Balance;