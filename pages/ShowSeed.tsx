import React from "react";
import backgroundSvg from "../assets/background.svg";
import showSeedSvg from "../assets/show-seed.svg";
import BackHeader from "@/components/BackHeader";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWalletStore } from "@/stores/walletStore";

export default function ShowSeed() {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const navigate = useNavigate();
  return (
    <div
      className="w-full min-h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Show Seed Phrase" />
      <div className="flex flex-col items-center w-full p-4 flex-1">
        <img src={showSeedSvg} alt="Show Seed" className="mb-4 mt-10" />
        <h1 className="text-white text-3xl mb-2 mt-10">Show Seed Phrase</h1>
        <p className="text-red-500 text-left mb-4 mt-10">
            <AlertCircle className="text-red-500 inline-block mr-2" />Seed phrase is the only way to recover your wallet & accounts. Do not share or let anyone see your seed phrase.
        </p>
        <div className="flex items-center mb-4 ">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-white text-sm">
            I will not share the secret seed phrase to anyone, including staff from Serenity.
          </label>
        </div>
      </div>

      <Button
        className="mt-4 h-[50px] ml-10 mr-10 mb-10 rounded-full bg-gradient-to-r from-[#573CFA] to-[#2F1EB3] text-white flex justify-center items-center"
        onClick={() => {
          useWalletStore.getState().setIsShowSeed(true); 
          navigate("/welcome-back")
        }}
        disabled={!isChecked}
      >
        Continue
      </Button>
    </div>
  );
}
