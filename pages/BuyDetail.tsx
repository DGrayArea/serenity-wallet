import { Button } from "@/components/ui/button";
import backgroundSvg from "../assets/background.svg";
import ImportHeader from "@/components/ImportHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import USD from "../assets/USD.svg";
import Euro from "../assets/Euro.svg";
import Pound from "../assets/Pound.svg";
import Rupee from "../assets/Rupee.svg";
import Card from "../assets/Card.svg";
import Bank from "../assets/Bank.svg";
import SOL from "../assets/SOL.svg";
import USDC from "../assets/USDC.svg";
import MUMU from "../assets/MUMU.svg";
import Coinbase from "../assets/Coinbase.svg";
import { useState } from "react";
import { CURRENCIES, CURRENCIESTYPES } from "@/stores/Constants";
import { ChevronDown, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BuyDetail() {

  const currencyAvatars: { [key: string]: string } = {
    "USD": USD,
    "Euro": Euro,
    "Pound": Pound,
    "Rupee": Rupee
  }

  const bankTypes = [
    {
      id: 1,
      icon: Card,
      title: "Bank Card"
    },
    {
      id: 2,
      icon: Bank,
      title: "INstant Bank Transfer"
    }
  ];

  const tokens = [
    {
      id: 1,
      ticker: 'SOL',
      icon: SOL,
    },
    {
      id: 2,
      ticker: 'USDC',
      icon: USDC
    },
    {
      id: 3,
      ticker: 'MUMU',
      icon: MUMU
    }
  ];

  const navigate = useNavigate();

  const [selectCurrency, setSelectCurrency] = useState<string>('USD');
  const [selectBank, setSelectBank] = useState<number>(0);
  const [selectToken, setSelectTOken] = useState<number>(0);

  const [currency, setCurrency] = useState<number>(0.0);
  const [token, setToken] = useState<number>(0.0);

  const [active, setActive] = useState<number>(0);

  const handleChangeCurrency = (value: number) => {
    setCurrency(value);
    if (value < 8.69 || value > 16167.99) {
      setActive(2);
      if (value === 0) setActive(0);
    }
    else setActive(1);
  }

  const handleChangeToken = (value: number) => {
    setToken(value);
  }

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >

      <ImportHeader success={false} content="Buy" />

      <div className="w-full h-screen overflow-auto scrollbar-none flex flex-col flex-1 py-3 px-4 items-center">
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2">
          <div className="col-span-2 px-1">
            <div className={'px-4 py-1 bg-gray-50 bg-opacity-5 border text-white text-sm rounded-lg block items-center mt-4 cursor-pointer ' + (active ? (active > 1 ? 'border-[#FF4231]' : 'border-[#573CFA]') : 'border-gray-300')}>
              <p className="border-none text-[#93EBD3]">You spend</p>
              <input type="number" className="w-full bg-transparent bg-none border-none border bg-gray-50 bg-opacity-5 text-md rounded-lg block text-white outline-none" placeholder="0.0" value={currency} onChange={(e) => handleChangeCurrency(Number(e.target.value))} ></input>
            </div>
            {
              active > 1 ?
                <div className="flex items-center text-red-600">
                  <XCircle size={40} />
                  <p className="ml-2">Amount should be in USD 8.69 minimum and USD 16167.99 maximum</p>
                </div> : <></>
            }
          </div>
          <div className="col-span-2 px-1">
            <div className={'px-4 py-1 bg-gray-50 bg-opacity-5 border border-gray-300 text-white text-sm rounded-lg block items-center mt-4 cursor-pointer ' + (active ? (active > 1 ? 'border-[#FF4231]' : 'border-[#573CFA]') : '')}>
              <p className="border-none text-[#93EBD3]">You get</p>
              <input type="number" className="w-full bg-transparent bg-none border-none border bg-gray-50 bg-opacity-5 text-md rounded-lg block text-white outline-none" placeholder="0.0" value={token} onChange={(e) => handleChangeToken(Number(e.target.value))} ></input>
            </div>
          </div>
          <div className="mt-4 px-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='text-white flex items-center px-4 py-3 border border-white border-opacity-70 rounded-lg'>
                  <div className="flex flex-col justify-center">
                    <img src={currencyAvatars[selectCurrency]} alt={selectCurrency} className="w-6 h-6 mr-3 rounded-[50%]" />
                  </div>
                  {selectCurrency} <ChevronDown className="ml-2 h-6 w-6 center" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-40 text-white border border-white border-opacity-30 backdrop-blur-sm backdrop-brightness-[0.9] rounded-lg absolute right-[-57px]">
                {CURRENCIESTYPES.map((item: string, index: number) => (
                  <DropdownMenuItem
                    className="py-1 px-1 flex cursor-pointer"
                    key={index}
                    onClick={() => setSelectCurrency(item)}
                  >
                    <img src={currencyAvatars[item]} alt={item} className="w-6 h-6 mr-3 rounded-[50%]" />
                    {CURRENCIES[item]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-4 px-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className='text-white flex items-center px-4 py-3 border border-white border-opacity-70 rounded-lg'>
                  <div className="flex flex-col justify-center">
                    <img src={tokens[selectToken].icon} alt={tokens[selectToken].ticker} className="w-6 h-6 mr-3 rounded-[50%]" />
                  </div>
                  {tokens[selectToken].ticker} <ChevronDown className="ml-2 h-6 w-6 center" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-40 text-white border border-white border-opacity-30 backdrop-blur-sm backdrop-brightness-[0.9] rounded-lg absolute right-[-57px]">
                {tokens.map((item, index: number) => (
                  <DropdownMenuItem
                    className="py-1 px-1 flex cursor-pointer"
                    key={index}
                    onClick={() => setSelectTOken(index)}
                  >
                    <img src={item.icon} alt={item.ticker} className="w-6 h-6 mr-3 rounded-[50%]" />
                    {item.ticker}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="w-full mt-3 flex justify-between text-white items-center">
          <p>1 SOL = @234.61</p>
          <div className="flex cursor-pointer" onClick={() => navigate('/select-third')}>
            <p>by</p>
            <img src={Coinbase} alt="Coinbase" width={20} height={20} />
            <p>Coinbase</p>
            <ChevronDown />
          </div>
        </div>
        <div className="w-full mt-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-between w-full border border-white border-opacity-70 rounded-lg px-4 py-1 items-center">
                <div>
                  <p className="text-[#93EBD3]">Pay with</p>
                  <div className='text-white flex items-center py-1'>
                    <div className="flex flex-col justify-center">
                      <img src={bankTypes[selectBank].icon} alt={bankTypes[selectBank].title} className="w-6 h-6 mr-3 rounded-[50%]" />
                    </div>
                    {bankTypes[selectBank].title}
                  </div>
                </div>
                <ChevronDown className="ml-2 h-6 w-6 center text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[369px] text-white border border-white border-opacity-30 backdrop-blur-sm backdrop-brightness-[0.9] rounded-lg absolute right-[-184px]">
              {bankTypes.map((item, index: number) => (
                <DropdownMenuItem
                  className="py-2 px-3 flex cursor-pointer"
                  key={index}
                  onClick={() => setSelectBank(index)}
                >
                  <img src={item.icon} alt={item.title} className="w-6 h-6 mr-3 rounded-[50%]" />
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button className='w-[90%] mx-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px] absolute bottom-4' onClick={() => navigate('/connecting')}>Continue</Button>
      </div>
    </div>
  );
}