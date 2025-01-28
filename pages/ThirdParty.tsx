import { Button } from "@/components/ui/button";
import backgroundSvg from "../assets/background.svg";
import ImportHeader from "@/components/ImportHeader";
import Coinbase from "../assets/Coinbase.svg";
import Moonpay from "../assets/Moonpay.svg";
import { useNavigate } from "react-router-dom";

export default function ThirdParty() {

  const navigate = useNavigate();

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >

      <ImportHeader success={false} content="Buy" />

      <div className="w-full h-screen overflow-auto scrollbar-none flex flex-col flex-1 py-4 px-4 items-center">
        <div className="w-full">
          <div className="p-3 w-full rounded-lg bg-[#171121] border border-[#8884FF] flex">
            <img src={Moonpay} alt="Moonpay" width={32} height={32} />
            <p className="ml-2 text-white">Moonpay</p>
          </div>
          <div className="p-3 w-full rounded-lg bg-[#171121] border border-[#8884FF] flex mt-3">
            <img src={Coinbase} alt="Coinbase" width={32} height={32} />
            <p className="ml-2 text-white">Coinbase Pay</p>
          </div>
        </div>
        <Button className='w-[90%] mx-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px] absolute bottom-4' onClick={() => navigate('/connecting')}>Continue</Button>
      </div>
    </div>
  );
}