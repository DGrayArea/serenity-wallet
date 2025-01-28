/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-explicit-any */
// content.ts
console.log('MyWallet Solana content script loaded');

interface MyWalletAdapter {
  publicKey: string | null;
  isConnected: boolean;
  connect(): Promise<{ publicKey: string }>;
  disconnect(): Promise<void>;
  signTransaction(transaction: any): Promise<any>;
  signAllTransactions(transactions: any[]): Promise<any[]>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array; publicKey: string }>;
}

class MyWalletAdapter implements MyWalletAdapter {
  publicKey: string | null = null;
  isConnected = false;

  private async sendMessage(message: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const sendMessageWithRetry = () => {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            if (chrome.runtime.lastError.message === "Extension context invalidated.") {
              console.log("Extension context invalidated. Retrying in 1 second...");
              setTimeout(sendMessageWithRetry, 1000);
            } else {
              reject(chrome.runtime.lastError);
            }
          } else {
            resolve(response);
          }
        });
      };
      sendMessageWithRetry();
    });
  }

  async connect(): Promise<{ publicKey: string }> {
    console.log('MyWallet: Connect method called');
    try {
      const response = await this.sendMessage({ type: 'CONNECT_REQUEST' });
      if (response && response.publicKey) {
        this.publicKey = response.publicKey;
        this.isConnected = true;
        return { publicKey: this.publicKey  as string};
      } else {
        throw new Error('Failed to connect');
      }
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    console.log('MyWallet: Disconnect method called');
    try {
      await this.sendMessage({ type: 'DISCONNECT_REQUEST' });
      this.publicKey = null;
      this.isConnected = false;
    } catch (error) {
      console.error('Disconnection error:', error);
      throw error;
    }
  }

  async signTransaction(transaction: any): Promise<any> {
    console.log('MyWallet: Sign transaction called');
    try {
      const response = await this.sendMessage({ type: 'SIGN_TRANSACTION', transaction });
      if (response && response.signedTransaction) {
        return response.signedTransaction;
      } else {
        throw new Error('Failed to sign transaction');
      }
    } catch (error) {
      console.error('Sign transaction error:', error);
      throw error;
    }
  }

  async signAllTransactions(transactions: any[]): Promise<any[]> {
    console.log('MyWallet: Sign all transactions called');
    try {
      const response = await this.sendMessage({ type: 'SIGN_ALL_TRANSACTIONS', transactions });
      if (response && response.signedTransactions) {
        return response.signedTransactions;
      } else {
        throw new Error('Failed to sign transactions');
      }
    } catch (error) {
      console.error('Sign all transactions error:', error);
      throw error;
    }
  }

  async signMessage(message: Uint8Array): Promise<{ signature: Uint8Array; publicKey: string }> {
    console.log('MyWallet: Sign message called');
    try {
      const response = await this.sendMessage({ type: 'SIGN_MESSAGE', message: Array.from(message) });
      if (response && response.signature && response.publicKey) {
        return {
          signature: new Uint8Array(response.signature),
          publicKey: response.publicKey
        };
      } else {
        throw new Error('Failed to sign message');
      }
    } catch (error) {
      console.error('Sign message error:', error);
      throw error;
    }
  }
}

function injectMyWallet() {
  console.log('MyWallet: Injecting wallet adapter');
  const myWalletAdapter = new MyWalletAdapter();
  
  // Inject the adapter into the window object
  (window as any).MyWalletAdapter = myWalletAdapter;

  // Dispatch an event to notify that MyWallet is ready
  window.dispatchEvent(new Event('MyWalletAdapterReady'));
  
  console.log('MyWallet: Injection complete');
}

injectMyWallet();

// Use a more resilient message listener
function addRuntimeMessageListener() {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'WALLET_EVENT') {
      window.dispatchEvent(new CustomEvent('mywalletEvent', { detail: message.event }));
    }
    return true;
  });
}

function setupMessageListener() {
  addRuntimeMessageListener();
  
  // Reattach the listener if the extension is updated or reloaded
  chrome.runtime.onInstalled.addListener(addRuntimeMessageListener);
}

setupMessageListener();