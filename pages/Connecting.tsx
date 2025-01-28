import backgroundSvg from "../assets/background.svg";
import Coinbase from "../assets/Coinbase.svg";
import Wallet from "../assets/wallet.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";

export default function Connecting() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/send/success', { state: { text: '15 SOL has been added!' } })
    }, 2000);
  }, [])

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="w-full py-4 px-4 text-white text-center">
        <div className="w-full flex justify-between items-center">
          <img src={Wallet} alt="Wallet" width={64} height={64} />
          <ChevronRight />
          <ChevronRight />
          <ChevronRight />
          <ChevronRight />
          <img src={Coinbase} alt="Coinbase" width={64} height={64} />
        </div>
        Connecting you to Coinbase
      </div>
    </div>
  );
}