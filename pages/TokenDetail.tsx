/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import backgroundSvg from '../assets/background.svg';
import TokenHeader from '@/components/TokenHeader';
import TopBarTokenDetail from '@/components/TopBarTokenDetail';
import Buy from "./../assets/BuyIcon.svg";
import Receive from "./../assets/ReceiveIcon.svg";
import Swap from "./../assets/SwapIcon.svg";
import Stake from "./../assets/StackIcon.svg";
import Line from "./../assets/LineChart.svg";
import Bar from "./../assets/BarChart.svg";
import PriceChart from '@/components/PriceChart';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { COINGECKO_API_KEY } from '@/stores/Constants';


type usdType = {
  usd: number
}

type marketType = {
  market_cap: usdType,
  total_volume: usdType,
  circulating_supply: number,
  total_supply: number,
  low_24h: usdType,
  high_24h: usdType,
  current_price: usdType,
  price_change_24h: number,
  price_change_percentage_24h: number
}

type coinType = {
  market_data: marketType,
  name: string,
  symbol: string,
  image: { large: string }
}

const TokenDetail: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const tokenAddress = location.state.tokenAddress;
  const balance = location.state.balance;
  const [coinData, setCoinData] = useState<coinType>({
    market_data: {
      market_cap: { usd: 0 },
      total_volume: { usd: 0 },
      circulating_supply: 0,
      total_supply: 0,
      low_24h: { usd: 0 },
      high_24h: { usd: 0 },
      current_price: { usd: 0 },
      price_change_24h: 0,
      price_change_percentage_24h: 0
    },
    name: "",
    symbol: "",
    image: { large: "" },
  });

  useEffect(() => {

    async function getSolanaData() {
      const url = `https://pro-api.coingecko.com/api/v3/coins/solana/contract/${tokenAddress}`;
      const options = {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-pro-api-key': COINGECKO_API_KEY }
      };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Solana Data:", data);
        setCoinData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getSolanaData();
  }, []);

  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <TokenHeader token={coinData?.name} />
      <TopBarTokenDetail coinData={coinData} balance={balance} />
      <div className='w-full p-4'>
        <div className='w-full flex justify-between'>
          <div className='text-white flex flex-col justify-center text-center py-2 px-6 w-auto rounded-lg bg-gradient-to-r from-[#573CFA] to-[#8884FF]' onClick={() => navigate('/buy/detail', { state: { selectToken: coinData.symbol } })}>
            <img src={Buy} alt='Buy' className='h-4 mb-2' />
            Buy
          </div>
          <div className='text-white flex flex-col justify-center text-center py-2 px-6 w-auto rounded-lg bg-[#362854]'>
            <img src={Receive} alt='Receive' className='h-5 mb-2' />
            Receive
          </div>
          <Link to='/swap' className='text-white flex flex-col justify-center text-center py-2 px-6 w-auto rounded-lg bg-[#362854]'>
            <img src={Swap} alt='Swap' className='h-4 mb-2' />
            Swap
          </Link>
          <div className='text-white flex flex-col justify-center text-center py-2 px-6 w-auto rounded-lg bg-[#362854]'>
            <img src={Stake} alt='Stake' className='h-5 mb-2' />
            Stake
          </div>
        </div>
        <div className='bg-gray-900 border border-[#947EAE] rounded-lg mt-5 w-full flex flex-col items-center px-4 py-6'>
          <div className='flex text-white justify-between items-center w-full'>
            <p>Global Average</p>
            <div className='flex'>
              <img src={Line} alt='Line' />
              <img src={Bar} alt='Bar' />
            </div>
          </div>
          <PriceChart tokenAddress={tokenAddress} />
          <div className='py-2 w-full grid grid-cols-2 justify-between'>
            <div className='text-white mt-2'>
              <p className='opacity-50'>Market Cap</p>
              <p>{coinData?.market_data.market_cap.usd.toFixed(2) + ' ' + coinData.symbol}</p>
            </div>
            <div className='text-white mt-2'>
              <p className='opacity-50'>Volume (24 hours)</p>
              <p>${coinData?.market_data.total_volume.usd.toFixed(2)}</p>
            </div>
            <div className='text-white mt-2'>
              <p className='opacity-50'>Circulating Supply</p>
              <p>{coinData?.market_data.circulating_supply.toFixed(2) + ' ' + coinData.symbol}</p>
            </div>
            <div className='text-white mt-2'>
              <p className='opacity-50'>Total Supply</p>
              <p>{coinData?.market_data.total_supply.toFixed(2) + ' ' + coinData.symbol}</p>
            </div>
            <div className='text-white mt-2'>
              <p className='opacity-50'>Low (24 hours)</p>
              <p>${coinData?.market_data.low_24h.usd}</p>
            </div>
            <div className='text-white mt-2'>
              <p className='opacity-50'>High (24 hours)</p>
              <p>${coinData?.market_data.high_24h.usd}</p>
            </div>
          </div>
        </div>
        <h1 className='text-white mt-4'>Recent Activities</h1>
      </div>
    </div>
  );
};

export default TokenDetail;