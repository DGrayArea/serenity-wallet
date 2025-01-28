import { useLocation, useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import swap from "@/assets/Swap.svg";
import { Button } from "@/components/ui/button";
import ImportHeader from "@/components/ImportHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { cryptoDataType } from "@/lib/cryptoDataType";
import { ChevronDown } from "lucide-react";

export default function SendAmount() {


  const navigate = useNavigate();
  const location = useLocation();

  const [selectToken, setSelectToken] = useState<number>(location.state.selectToken);
  const [amount, setAmount] = useState<number>(0.0);

  const data: cryptoDataType[] = location.state.data;
  const address: string = location.state.address;

  const handleContinueClick = async () => {
    try {
      navigate('/send/ready', { state: { data: location.state.data, selectToken: location.state.selectToken, amount, address } });

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <ImportHeader success={false} content="Send Amount" />

      <div className="w-full h-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
        <div className="w-full flex flex-col items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='text-white flex items-center px-4 py-2 border border-white border-opacity-70 rounded-lg'>
                <div className="flex flex-col justify-center">
                  <img src={data[selectToken].image} alt={`${data[selectToken].ticker} logo`} className="w-10 h-10 mr-3 rounded-[50%]" />
                </div>
                {selectToken && data[selectToken].ticker} <ChevronDown className="ml-2 h-4 w-4 center" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white border border-white border-opacity-30 backdrop-blur-sm backdrop-brightness-[0.9] rounded-lg">
              {data.map((token: cryptoDataType, index: number) => (
                <DropdownMenuItem
                  className="py-1 px-8 flex cursor-pointer"
                  key={index}
                  onClick={() => setSelectToken(index)}
                >
                  <img src={token.image} alt={`${token.ticker} logo`} className="w-10 h-10 mr-3 rounded-[50%]" />
                  {token.ticker}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-[60%] flex items-center justify-between mt-8">
            <input type="number" defaultValue={0.0} className="p-2 text-xl border-none bg-none bg-transparent text-white w-32 focus:outline-none focus:border-none" onChange={(e) => setAmount(Number(e.target.value))} value={amount} />
            <button className="border border-white rounded-full text-white px-3 py-1">Max</button>
          </div>
          <div className="mt-8 p-2 w-[30%] text-white flex justify-between bg-gray-50 bg-opacity-10 rounded-lg">
            <p>${(amount * data[selectToken].usdPrice).toFixed(2)}</p>
            <img src={swap} alt="Swap" className="w-6 h-6"></img>
          </div>
          <p className="text-white text-lg text-center mt-2">Balance: {data[selectToken].balance + ' ' + data[selectToken].ticker}</p>
        </div>
        <Button disabled={amount == 0 || amount > data[selectToken].balance} className='w-[90%] mx-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleContinueClick}>Continue</Button>
      </div>
    </div>
  );
}