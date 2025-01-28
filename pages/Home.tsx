/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import backgroundSvg from "../assets/background.svg";
import Header from "@/components/Header";
import { WalletManager } from "@/lib/WalletManager";
import UnlockWallet from "./UnlockWallet";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { EyeIcon, InfoIcon, Search } from "lucide-react";
import Buy from "./../assets/BuyIcon.svg";
import Receive from "./../assets/ReceiveIcon.svg";
import Stake from "./../assets/StackIcon.svg";
import Send from "./../assets/SendIcon.svg";
import Swap from "./../assets/SwapIcon.svg";
import News from "./../assets/BuyIcon.svg";
import CryptoTable from "@/components/CryptoTable";
import { Button } from "@/components/ui/button";
import ManageToken from "@/components/ManageToken";
import { useWalletStore } from "@/stores/walletStore";
import { cryptoDataType } from "@/lib/cryptoDataType";
// import AddConnectWallet from '@/components/AddConnectWallet';
// import Wallets from '@/components/Wallets';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { COINGECKO_API_KEY } from "@/stores/Constants";
import AddConnectWallet from "@/components/AddConnectWallet";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedAccount } = useWalletStore();
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const [stateMenu, setStateMenu] = useState<string>("hidden");

  const [data, setData] = useState<cryptoDataType[]>(
    new Array<cryptoDataType>()
  );
  const [isManage, setIsManage] = useState<boolean>(false);

  const [balance, setBalance] = useState<number>(0);
  const [prebalance, setPreBalance] = useState<number>(0);

  const [searchValue, setSearchValue] = useState<string>("");
  const [isAddConnectWallet, setIsAddConnectWallet] = useState<boolean>(false);

  const [isWatch, setIsWatch] = useState<boolean>(true);

  const [manageWallet, setMangeWallet] = useState<boolean>(false);

  useEffect(() => {
    setIsWatch(location.state?.isWatch);
  }, []);

  useEffect(() => {
    const checkWalletStatus = async () => {
      const locked = WalletManager.isWalletLocked();
      setIsLocked(locked);
    };

    async function getSolanaData() {
      const url = "https://pro-api.coingecko.com/api/v3/coins/solana";
      const url1 =
        "https://pro-api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true";
      // const url = 'https://pro-api.coingecko.com/api/v3/onchain/networks/solana/tokens/So11111111111111111111111111111111111111112';
      // const url1 = 'https://pro-api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=So11111111111111111111111111111111111111112&vs_currencies=usd&include_24hr_change=true';
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-pro-api-key": COINGECKO_API_KEY,
        },
      };
      try {
        const response = await fetch(url, options);
        const response1 = await fetch(url1, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const solData = await response.json();
        const changeData = await response1.json();
        if (selectedAccount) {
          // const preTokenList: cryptoDataType[] = await WalletManager.getTokenList(selectedAddress);
          // const preTokenList: cryptoDataType[] = await WalletManager.getTokenList('3dLmiGMgQfaFKP9wEbVcCisKE43AMTuYEcckwoFimonc');
          console.log("selectedAccount: ", selectedAccount);

          const preTokenList: cryptoDataType[] = new Array<cryptoDataType>();
          const solBalance = await WalletManager.getBalance(
            selectedAccount.publicKey || ""
          );
          const solToken: cryptoDataType = {
            tokenAccount: "",
            mint: "So11111111111111111111111111111111111111112",
            balance: solBalance,
            usdPrice: changeData["solana"].usd,
            priceChange: changeData["solana"].usd_24h_change,
            usdBalance: solBalance * changeData["solana"].usd,
            ticker: "SOL",
            image: solData.image.small,
            flag: true,
          };
          setBalance(
            solToken.usdBalance +
            preTokenList.reduce((sum, current) => sum + current.usdBalance, 0)
          );
          setPreBalance(
            (solToken.usdBalance * 100) / (100 + solToken.priceChange) +
            preTokenList.reduce(
              (sum, current) =>
                sum +
                (current.usdBalance * 100) / (100 + current.priceChange),
              0
            )
          );
          setData([solToken, ...preTokenList]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    checkWalletStatus();
    getSolanaData();
  }, [selectedAccount]);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  if (isLocked) {
    return (
      <div
        className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${backgroundSvg})` }}
      >
        <UnlockWallet onUnlock={handleUnlock} />
      </div>
    );
  }

  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
    console.log(menu);
  };

  const changeCryptoData = (flag: boolean, id: number) => {
    const changeData = data.map((item, index) =>
      id === index ? { ...item, flag } : item
    );
    setData([...changeData]);
  };

  const handleManage = (state: boolean) => {
    setIsManage(state);
    console.log("Solana Data:", data);
  };

  const displayChange = () => {
    if (prebalance === 0) return 0;
    return balance > prebalance
      ? "+" + ((100 * (balance - prebalance)) / prebalance).toFixed(0)
      : ((100 * (balance - prebalance)) / prebalance).toFixed(0) || 0;
  };

  const returnValue = () => {
    return balance > prebalance
      ? "+$" + (balance - prebalance).toFixed(2)
      : "$" + (balance - prebalance).toFixed(2);
  };

  const stateAddWallet = (state: boolean) => {
    setIsAddConnectWallet(state);
  };

  const setManageWalletState = (state: boolean) => {
    setMangeWallet(state);
    setStateMenu('hidden');
  }

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header
        MenuClick={handleMenuClick}
        stateAddWallet={stateAddWallet}
        manageWallet={manageWallet}
        setManageWalletState={setManageWalletState}
        className="sticky top-0 z-50"
      />
      <div className="flex flex-col items-center w-full p-4">
        <div className="bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg rounded-lg text-white p-2 w-full">
          <p>Total Value Asset</p>
          <h1 className="flex">
            ${balance.toFixed(2)}&nbsp;{" "}
            <span className="opacity-50 text-[#77E318]">
              {displayChange()}%&nbsp;
            </span>{" "}
            <EyeIcon className="size-5 mt-[3px]" />
          </h1>
          <p className="mt-6 flex">
            Return value (24H) &nbsp; <InfoIcon className="size-5 mt-[3px]" />
          </p>
          <p className="flex">
            {returnValue()}&nbsp;{" "}
            <span className="opacity-50 flex text-[#77E318]">
              {displayChange()}%&nbsp;{" "}
            </span>
            <EyeIcon className="size-5 mt-[3px]" />
          </p>
        </div>
        {isWatch === true ? (
          <></>
        ) : (
          <div className="w-full bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-10 border border-[#947EAE] rounded-lg mt-5">
            <div className="w-full mx-auto px-4 py-4 justify-between grid grid-cols-3">
              <div
                className="text-white flex flex-col justify-center text-center py-2 cursor-pointer"
                onClick={() => {
                  navigate("/select-token", {
                    state: { data, content: "Buy" },
                  });
                }}
              >
                <img src={Buy} alt="Buy" className="h-4 mb-2" />
                Buy
              </div>
              <div
                className="text-white flex flex-col justify-center text-center py-2 cursor-pointer"
                onClick={() => navigate("/receive")}
              >
                <img src={Receive} alt="Receive" className="h-5 mb-2" />
                Receive
              </div>
              <Link
                to="/stake"
                className="text-white flex flex-col justify-center text-center py-2 cursor-pointer"
              >
                <img src={Stake} alt="Stake" className="h-5 mb-2" />
                Stake
              </Link>
              <div
                className="text-white flex flex-col justify-center text-center py-2 cursor-pointer"
                onClick={() => {
                  navigate("/select-token", { state: { data, content: 'Send' } });
                }}
              >
                <img src={Send} alt="Send" className="h-5 mb-2" />
                Send
              </div>
              <Link
                to="/swap"
                className="text-white flex flex-col justify-center text-center py-2 cursor-pointer"
              >
                <img src={Swap} alt="Swap" className="h-4 mb-2" />
                Swap
              </Link>
              <div className="text-white flex flex-col justify-center text-center py-2 cursor-pointer">
                <img src={News} alt="News" className="h-4 mb-2" />
                News
              </div>
            </div>
          </div>
        )}
        <div className="relative w-full mt-5">
          <input
            type="text"
            className="bg-gray-50 bg-opacity-5 border border-gray-300 text-white text-sm rounded-lg block w-full ps-2 p-2.5"
            value={searchValue}
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <Search className="text-white" />
          </button>
        </div>
        <div className="bg-gray-900 border border-[#947EAE] rounded-lg mt-5 w-full flex flex-col items-center">
          <CryptoTable data={data} searchValue={searchValue} />
          <Button
            className="w-[48%] h-[50px] rounded-full bg-gradient-to-r from-[#FFFFFF]-0 to-[#FFFFFF] text-[20px]-100 text-white border border-solid border-white mb-4"
            onClick={() => handleManage(true)}
          >
            Manage Token
          </Button>
        </div>
      </div>
      {isManage ? (
        <ManageToken
          className=""
          cryptoData={data}
          changeSwitch={changeCryptoData}
          stateManage={handleManage}
        />
      ) : (
        <></>
      )}
      <Footer className="sticky bottom-0 z-49" />
      {isAddConnectWallet ? (
        <AddConnectWallet
          handleCancel={() => {
            setIsAddConnectWallet(false);
          }}
        />
      ) : (
        <></>
      )}
      <Navbar className={stateMenu} stateMenu={handleMenuClick} manageWallet={setManageWalletState} />
    </div>
  );
}
