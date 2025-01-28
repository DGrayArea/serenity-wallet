/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
// import NFTData from "@/config/NFTData.json";
import tokenList from "@/config/tokenList.json";
// type NFTDataType = typeof NFTData;
const tokenType = {
  address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  decimals: 6,
  name: "USDT",
  symbol: "USDT",
  market_cap: 137883501941,
  price: 1.001,
  price_24h_change: -0.00452,
  logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
};
const quoter = {
  inputMint: "So11111111111111111111111111111111111111112",
  inAmount: "1000000000",
  outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  outAmount: "194304423",
  otherAmountThreshold: "193332901",
  swapMode: "ExactIn",
  slippageBps: 50,
  platformFee: null,
  priceImpactPct: "0",
  routePlan: [
    {
      swapInfo: {
        ammKey: "FpCMFDFGYotvufJ7HrFHsWEiiQCGbkLCtwHiDnh7o28Q",
        label: "Whirlpool",
        inputMint: "So11111111111111111111111111111111111111112",
        outputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        inAmount: "1000000000",
        outAmount: "194304423",
        feeAmount: "20",
        feeMint: "So11111111111111111111111111111111111111112",
      },
      percent: 100,
    },
  ],
  scoreReport: null,
  contextSlot: 308559338,
  timeTaken: 0.013762955,
};
const tx = {
  transaction: {
    signatures: [
      {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0,
        "13": 0,
        "14": 0,
        "15": 0,
        "16": 0,
        "17": 0,
        "18": 0,
        "19": 0,
        "20": 0,
        "21": 0,
        "22": 0,
        "23": 0,
        "24": 0,
        "25": 0,
        "26": 0,
        "27": 0,
        "28": 0,
        "29": 0,
        "30": 0,
        "31": 0,
        "32": 0,
        "33": 0,
        "34": 0,
        "35": 0,
        "36": 0,
        "37": 0,
        "38": 0,
        "39": 0,
        "40": 0,
        "41": 0,
        "42": 0,
        "43": 0,
        "44": 0,
        "45": 0,
        "46": 0,
        "47": 0,
        "48": 0,
        "49": 0,
        "50": 0,
        "51": 0,
        "52": 0,
        "53": 0,
        "54": 0,
        "55": 0,
        "56": 0,
        "57": 0,
        "58": 0,
        "59": 0,
        "60": 0,
        "61": 0,
        "62": 0,
        "63": 0,
      },
    ],
    message: {
      header: {
        numRequiredSignatures: 1,
        numReadonlySignedAccounts: 0,
        numReadonlyUnsignedAccounts: 12,
      },
      staticAccountKeys: [
        "8UaUStYRUR7nE6s7JsxkfXwgHcErHiWtdmEfcBaDr5F5",
        "3u4bA5o7WVhXEYRSMrDWpfAxGXKqa6pLpsKwD1D11Gjf",
        "4N5GZxP3naiCvmYoE4rptK1RGfGV9KeDCyc7o6CeiZB1",
        "7HEZuN8iVGmrrjnCjee7ZaWAuDZYHpzzZuynUZDZo23J",
        "8ZVpKcH3koyXgmge7vCCzrMRHR6Xw7UG7YeH11XLTK75",
        "CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM",
        "HLGr8vJQNrDFwUtyyQQ8GBMdempGwged2vmbwjefrHeH",
        "11111111111111111111111111111111",
        "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
        "ComputeBudget111111111111111111111111111111",
        "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
        "So11111111111111111111111111111111111111112",
        "SysvarRent111111111111111111111111111111111",
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        "4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf",
        "5oxkwhbmJ3vA2bVaFk6EsYJPbWisKkqjrMiCcVippump",
        "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
        "Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1",
        "D8cy77BBepLMngZx6ZukaTff5hCt1HrWyKk3Hnd9oitf",
      ],
      recentBlockhash: "HNveWhaDarcyR7eKYqsUZyBJt7NvnqDgMRwGdXJPQXh2",
      compiledInstructions: [
        {
          programIdIndex: 9,
          accountKeyIndexes: [],
          data: {
            "0": 2,
            "1": 192,
            "2": 92,
            "3": 21,
            "4": 0,
          },
        },
        {
          programIdIndex: 9,
          accountKeyIndexes: [],
          data: {
            "0": 3,
            "1": 4,
            "2": 23,
            "3": 1,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
          },
        },
        {
          programIdIndex: 16,
          accountKeyIndexes: [0, 3, 0, 11, 7, 13],
          data: {
            "0": 1,
          },
        },
        {
          programIdIndex: 7,
          accountKeyIndexes: [0, 3],
          data: {
            "0": 2,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 202,
            "6": 154,
            "7": 59,
            "8": 0,
            "9": 0,
            "10": 0,
            "11": 0,
          },
        },
        {
          programIdIndex: 13,
          accountKeyIndexes: [3],
          data: {
            "0": 17,
          },
        },
        {
          programIdIndex: 16,
          accountKeyIndexes: [0, 4, 0, 15, 7, 13],
          data: {
            "0": 1,
          },
        },
        {
          programIdIndex: 10,
          accountKeyIndexes: [
            13, 0, 3, 4, 10, 15, 10, 18, 10, 8, 14, 5, 15, 6, 1, 4, 0, 7, 13,
            12, 17, 8, 3, 2, 11,
          ],
          data: {
            "0": 229,
            "1": 23,
            "2": 203,
            "3": 151,
            "4": 122,
            "5": 227,
            "6": 173,
            "7": 42,
            "8": 1,
            "9": 0,
            "10": 0,
            "11": 0,
            "12": 49,
            "13": 100,
            "14": 0,
            "15": 1,
            "16": 0,
            "17": 202,
            "18": 154,
            "19": 59,
            "20": 0,
            "21": 0,
            "22": 0,
            "23": 0,
            "24": 226,
            "25": 96,
            "26": 129,
            "27": 196,
            "28": 110,
            "29": 30,
            "30": 0,
            "31": 0,
            "32": 50,
            "33": 0,
            "34": 0,
          },
        },
        {
          programIdIndex: 13,
          accountKeyIndexes: [3, 0, 0],
          data: {
            "0": 9,
          },
        },
      ],
      addressTableLookups: [],
    },
  },
  blockhash: "GZnsXuRhneUcLC94LAKrR5p1dBf8N2PwjD2xBW61Xjvi",
  lastValidBlockHeight: 293389619,
};
export type Token = typeof tokenType | null;
export type Quote = typeof quoter | null;
export type Transaction = typeof tx | null | any;

interface CollectionState {
  collectibles: unknown[] | any;
  toggledStates: Record<string, boolean>;
  setCollectibles: (data: unknown[] | any) => void;
  toogleCollectibles: (data: unknown[] | any) => void;
  updateToggleState: (id: string, state: boolean) => void;
}
interface TokenState {
  fromToken: Token;
  toToken: Token;
  setFrom: (data: Token) => void;
  setTo: (data: Token) => void;
  clear: () => void;
}

interface QuoteState {
  quote: Quote;
  setQuote: (data: Quote) => void;
}

interface TransactionState {
  tx: Transaction;
  setTx: (data: Transaction) => void;
}

const useCollectionStore = create<CollectionState>()((set) => ({
  collectibles: [],
  toggledStates: {},
  setCollectibles: (data) =>
    set((state) => ({ collectibles: [...state.collectibles, ...data] })),
  toogleCollectibles: (data) => set(() => ({ collectibles: [...data] })),
  updateToggleState: (id, state) =>
    set((prevState) => ({
      toggledStates: {
        ...prevState.toggledStates,
        [id]: state,
      },
    })),
}));

const useSwapToken = create<TokenState>()((set) => ({
  fromToken: tokenList[0],
  toToken: tokenList[1],
  setFrom: (token) => set(() => ({ fromToken: token })),
  setTo: (token) => set(() => ({ toToken: token })),
  clear: () => set(() => ({ fromToken: null, toToken: null })),
}));

const useQuote = create<QuoteState>()((set) => ({
  quote: null,
  setQuote: (quote) => set(() => ({ quote: quote })),
}));

const useTransaction = create<TransactionState>()((set) => ({
  tx: null,
  setTx: (tran) => set(() => ({ tx: tran })),
}));

export { useCollectionStore, useSwapToken, useQuote, useTransaction };
