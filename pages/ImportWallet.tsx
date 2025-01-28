import { useLocation, useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import ImportHeader from "@/components/ImportHeader";
import { Check } from "lucide-react";

export default function ImportWallet() {

  const location = useLocation();

  const navigate = useNavigate();

  const handleContinueClick = async () => {
    navigate('/import/success');
  }

  const truncateAddress = (address: string) => {
    return address.length > 13 ? `${address.slice(0, 5)}...${address.slice(-5)}` : address;
  };

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <ImportHeader success={false} content="Import Seed Phrase" />

      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
        <div className="w-full flex flex-col items-center">
          <h1 className='text-xl text-white font-bold font-sans tracking-widest mt-[30%] text-center'>We found 1 wallet with activity</h1>
          <div className="w-full mt-8">
            {
              location.state.accounts.map((account: string, index: number) => {
                return <div className="bg-[#171121] w-full p-3 rounded-sm mt-4 flex text-left justify-between">
                  <div className="flex flex-col justify-center">
                    <div className="bg-gradient-to-r from-[#573CFA] to-[#8884FF] rounded-[50%] w-8 h-8 flex flex-col text-center justify-center text-white align-middle">{'A' + (index + 1)}</div>
                  </div>
                  <div className="w-[75%]">
                    <p className="text-white text-lg">Wallet {index + 1}</p>
                    <p className="text-white text-base opacity-50">{truncateAddress(account)}</p>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Check className="text-[#93FF50] border border-solid border-[#93FF50] rounded-[50%] p-2 w-8 h-8" />
                  </div>
                </div>
              })
            }
          </div>
        </div>
        <Button className='w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleContinueClick}>Continue</Button>
      </div>
    </div>
  );
}