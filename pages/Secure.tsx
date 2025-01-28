import { useNavigate } from "react-router-dom";
import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import { DotIcon, InfoIcon } from "lucide-react";
import { Step } from "@/components/ui/step";
import { WalletManager } from "@/lib/WalletManager";
import { useWalletStore } from "@/stores/walletStore";

export default function Secure() {
  const navigate = useNavigate();
  const { setSelectedAccount, setSelectedWallet } = useWalletStore();

  const handleStartSecure = async () => {
    const { phrase, account } = await WalletManager.createSeedPhrase();
    setSelectedAccount(account);
    setSelectedWallet(account.walletId || 0);
    navigate('/secure/wallet/step', { replace: true, state: { phrase } })
  }

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={1}  className="sticky top-0 z-50"/>

      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
        <div className="w-full">
          <h1 className="text-2xl text-white font-bold font-sans tracking-widest mt-4 text-center">
            Secure Your Wallet
          </h1>
          <p className="text-white opacity-70 text-center">
            Secure your wallet's seed phrase
          </p>
          <p className="underline flex text-cyan-400/100 mt-4 mb-5">
            <InfoIcon />
            &nbsp; Why is it important?
          </p>
          <div className="bg-[#171121] mt-1 border boder-solid rounded-lg border-x-indigo-400 text-white p-2">
            <p className="flex">
              Security lever:&nbsp;{" "}
              <p className="text-[#A0FF41]">Very strong</p>
            </p>
            <div className="flex mt-4">
              <Step className="bg-[#A0FF41]" />
              <Step className="bg-[#A0FF41] ml-2" />
              <Step className="bg-[#A0FF41] ml-2" />
              <Step className="bg-[#A0FF41] ml-2" />
            </div>
            <p className="mt-4">
              Write down your seed phrase on of paper, take screenshot or store
              it in a safe place.
            </p>
            <p className="mt-4">Other options: Doesn't have to be paper!</p>
            <p className="mt-4">Tips:</p>
            <p className="flex">
              <DotIcon />
              Store in bank vault
            </p>
            <p className="flex">
              <DotIcon />
              Store in a safe
            </p>
            <p className="flex">
              <DotIcon />
              Store in multiple secret places
            </p>
            <p className="mt-4">Risks are:</p>
            <p className="flex">
              <DotIcon />
              You lose it
            </p>
            <p className="flex">
              <DotIcon />
              You forget where you put it
            </p>
            <p className="flex">
              <DotIcon />
              Someone else finds it
            </p>
          </div>
        </div>
        <Button
          className="w-[90%] m-auto h-[45px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px] mt-5"
          onClick={handleStartSecure}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
