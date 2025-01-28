import { useNavigate } from "react-router-dom";
import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import resetApp from "../assets/ResetApp.svg";
import { Button } from "@/components/ui/button";
import { WalletManager } from "@/lib/WalletManager";

export default function ResetApp() {

  const navigate = useNavigate();

  const handleClickResetApp = async () => {
    await WalletManager.clearData();
    navigate('/');
  };

  return (
    <div
    className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
    style={{ backgroundImage: `url(${backgroundSvg})` }}
  >
      <BackHeader step={0} title="Reset App" className="sticky top-0 z-50" />

      <div className="flex flex-col justify-between flex-1 p-3 text-red">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <img src={resetApp} alt="ResetApp" width={150} height={200} />
          <p className="text-[#FF3737] text-2xl text-center mt-4">Reset & Wipe App</p>
          <p className="text-white text-lg text-center mt-4">This will remove all existing accounts and data. Make sure you have your seed phrase and wallet keys backed up.</p>
        </div>

        <div className="flex w-full">
          <Button
            className="mt-4 w-full h-[50px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF] mr-1"
            style={{ background: 'rgba(255, 255, 255, 0.04)' }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            className="mt-4 w-full h-[50px] rounded-full ml-1"
            style={{ background: '#FF4231' }}
            onClick={handleClickResetApp}
          >
            ResetApp
          </Button>
        </div>
      </div>
    </div>
  );
}