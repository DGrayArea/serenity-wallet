import BackHeader from "@/components/BackHeader";
import backgroundSvg from '../assets/background.svg';
import lockBgSvg from "../assets/lock-bg.svg"
import lockSvg from "../assets/lock.svg"
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const FaceId = () => {
  const navigate = useNavigate()
  const handleSkip = () => {
    navigate("/secure-wallet")
  }
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} />

      <div className="h-full w-full px-5 py-6 flex flex-col">
        <div className="grow flex flex-col justify-center w-[302px] mx-auto">
          <div className="w-full flex flex-col gap-6">
            {/* <img 
              src={lockSvg} 
              alt="lock" 
              className="w-full h-auto"
            /> */}
            <div className='w-[322px] h-[322px] bg-cover bg-no-repeat' style={{ backgroundImage: `url(${lockBgSvg})` }}>
              <img
                src={lockSvg}
                alt="lock"
                className="w-[280px] mx-auto h-auto"
              />
            </div>
            <h1
              className="text-[24px] text-center text-white"
            >
              Protect your wallet
            </h1>
            <div
              className="text-[16px] text-[#ABA8FF] text-center"
            >
              Biometric security ensures only you can access your wallet
            </div>
            <div
              className="h-[50px] w-full px-6 rounded-lg border border-white"
              style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            >
              <div className="w-full h-full flex flex-row justify-between items-center">
                <div className="text-[16px] font-medium text-white tracking-widest">Sign in with Face ID?</div>
                <Switch />
              </div>
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={handleSkip}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default FaceId