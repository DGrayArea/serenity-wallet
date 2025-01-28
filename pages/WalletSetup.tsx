import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import backgroundSvg from "../assets/background.svg";
import logo from "../assets/logo.svg";
import { Button } from "../components/ui/button";
import { ArrowLeftIcon, FileIcon, KeyRoundIcon, LinkIcon } from "lucide-react";

const WalletSetup: React.FC = () => {
  const [isImport, setIsImport] = useState<boolean>(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkWalletState = async () => {
  //     const hasPin = await WalletManager.hasPin();
  //     if (hasPin) {
  //       const hasSeedPhrase = await WalletManager.hasSeedPhrase();
  //       navigate(hasSeedPhrase ? '/home' : '/create/seedphrase', { replace: true });
  //     }
  //   };

  //   checkWalletState();
  // }, [navigate]);

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="text-frame">
        <img src={logo} className="h-[90px] mt-24" alt="Logo" />
        <p className="text-center text-[#ABA8FF] mt-4 text-base font-light leading-normal tracking-[0.64px] z-10">
          Your gateway to an elevated
          <br /> cryptocurrency experience{" "}
        </p>
      </div>
      {isImport ? (
        <div
          className={
            "w-full absolute bottom-0 backdrop-blur-sm backdrop-brightness-[0.3] rounded-t-lg p-4 border border-solid border-x-indigo-400"
          }
        >
          <div className="flex justify-between mb-2">
            <ArrowLeftIcon
              className="cursor-pointer text-white mt-1"
              onClick={() => setIsImport(false)}
            />
            <p className="text-white text-xl">Import Existing Wallet</p>
          </div>
          <div
            className="flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer"
            onClick={() => navigate("/import/seed")}
          >
            <FileIcon className="text-white" size={30} />
            <div className="ml-3">
              <p className="text-white text-lg">Import Seed Phrase</p>
              <p className="text-white opacity-60 text-base">
                Import accounts from another wallet
              </p>
            </div>
          </div>
          <div
            className="flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer"
            onClick={() => navigate("/import/key")}
          >
            <KeyRoundIcon className="text-white" size={30} />
            <div className="ml-3">
              <p className="text-white text-lg">Import Private Key</p>
              <p className="text-white opacity-60 text-base">
                Import a signle-chain account
              </p>
            </div>
          </div>
          <div className="flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer">
            <LinkIcon className="text-white" size={30} />
            <div className="ml-3">
              <p className="text-white text-lg">Connect Hardware Wallet</p>
              <p className="text-white opacity-60 text-base">
                User your ledger hardware wallet
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center h-[120px] justify-between mb-8">
          <Button
            className="w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]"
            onClick={() => {
              navigate("/create/pin", { replace: true });
            }}
          >
            Create a New Wallet
          </Button>
          <Button
            className="w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#FFFFFF]-0 to-[#FFFFFF] text-[17px]-100 text-white border border-solid border-white"
            onClick={() => setIsImport(true)}
          >
            Import Existing Wallet
          </Button>
        </div>
      )}
    </div>
  ); // or a loading spinner if you prefer
};

export default WalletSetup;
