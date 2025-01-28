export const COINGECKO_API_KEY =  import.meta.env.VITE_COINGECKO_API_KEY || ''
export const SOLSCAN_API_KEY = import.meta.env.VITE_SOLSCAN_API_KEY || ''
export const MAINNET = import.meta.env.VITE_MAINNET || "https://api.mainnet.solana.com"
export const DEVNET = import.meta.env.VITE_DEVNET || "https://api.devnet.solana.com"
export const CURRENCIESTYPES = [
    "USD",
    "Euro",
    "Pound",
    "Rupee"
]
export const CURRENCIES: {[key:string]: string} = {
    USD: "USD",
    Euro: "Euro",
    Pound: "British Pound",
    Rupee: "Rupee"
}
