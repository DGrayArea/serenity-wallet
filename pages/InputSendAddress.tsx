import { useLocation, useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import ImportHeader from "@/components/ImportHeader";
import { useState } from "react";
import { XCircle } from "lucide-react";
import { PublicKey } from "@solana/web3.js";

export default function InputSendAddress() {

  const [address, setAddress] = useState<string>("");
  const [isContinue, setIsContinue] = useState<boolean>(true);
  const [isValidAddress, setIsValidAddress] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleContinueClick = async () => {
    try {
      new PublicKey(address);
      if (location.state.nft)
        navigate('/send/ready-nft', { state: { nft: location.state.nft, floorPrice: location.state.floorPrice, address } });
      else
        navigate('/send/amount', { state: { data: location.state.data, selectToken: location.state.selectToken, address } });

    } catch (error) {
      console.log(error);
      setIsValidAddress(false);
    }
  }

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsValidAddress(true);
    if (e.target.value) setIsContinue(false);
    else setIsContinue(true);
  }

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <ImportHeader success={false} content="Send" />

      <div className="w-full h-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
        <div className="w-full flex flex-col items-center">
          <div className="w-full mt-4">
            <div className={'px-4 py-2 bg-gray-50 bg-opacity-5 border border-gray-300 text-white text-sm rounded-lg block items-center mt-4 cursor-pointer ' + (isValidAddress ? "border-[#362854]" : "border-red-600")}>
              <p className="border-none text-[#93EBD3]">To</p>
              <input className="w-full bg-transparent bg-none border-none border bg-gray-50 bg-opacity-5 text-sm rounded-lg block text-white outline-none" placeholder="Enter a wallet name or address" value={address} onChange={handleChangeKey}></input>
            </div>
            {
              isValidAddress ?
                <></>
                : <div className="flex text-red-600 mt-2">
                  <XCircle /><p className="ml-1">Invalid Address</p>
                </div>
            }
          </div>
        </div>
        <Button disabled={isContinue} className='w-[90%] mx-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleContinueClick}>Continue</Button>
      </div>
    </div>
  );
}