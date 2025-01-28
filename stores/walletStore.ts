import { AccountData } from '@/lib/WalletDatabase';
import { WalletManager } from '@/lib/WalletManager';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// interface account {
//   id?: number;
//   accountName?: string;
//   publicKey: string;
//   walletId?: number;
//   avatar?: string;
//   encryptedPrivateKey: string;  
// }

interface WalletState {
  accounts: AccountData[];
  selectedAccount: AccountData | null;
  selectedWallet: number | null;      
  editAccount: AccountData | null;
  isShowSeed: boolean;
  fetchAccounts: () => Promise<void>;
  setIsShowSeed: (isShowSeed: boolean) => void;
  setSelectedAccount  : (account: AccountData) => void;
  setSelectedWallet: (walletId: number) => void;
  addAccount: (account: AccountData) => void;
  setEditAccount: (account: AccountData) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      accounts: [],
      selectedAccount: null,
      selectedWallet: null,
      isShowSeed: false,
      editAccount: null,
      fetchAccounts: async () => {
        try {
          const accounts = await WalletManager.getAccounts();
          const currentSelected = get().selectedAccount;
          set({ 
            accounts: accounts,
            selectedAccount: currentSelected
              ? currentSelected 
              : accounts[0] || null 
          });
        } catch (error) {
          console.error('Error fetching wallet addresses:', error);
        }
      },
      setSelectedAccount: (account) => set({ selectedAccount: account }),
      setSelectedWallet: (walletId: number) => set({ selectedWallet: walletId }),
      setIsShowSeed: (isShowSeed: boolean) => set({ isShowSeed: isShowSeed }),
      addAccount: (account) => set((state) => ({
        accounts: [...state.accounts, account],
          selectedAccount: account,
        })),
      setEditAccount: (account) => set({ editAccount: account }),
    }),
    {
      name: 'wallet-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedAccount: state.selectedAccount }),
    }
  )
);