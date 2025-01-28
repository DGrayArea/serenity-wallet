import { useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import ImportHeader from "@/components/ImportHeader";
import secure from "../assets/Secure.svg"
import { useState } from "react";
import { WalletManager } from "@/lib/WalletManager";
import { XCircle } from "lucide-react";
import { useLoading, Puff } from '@agney/react-loading';

export default function ImportKey() {

  const [name, setName] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [isContinue, setIsContinue] = useState<boolean>(true);
  const [isValidKey, setIsValidKey] = useState<boolean>(true);
  const [isFinding, setIsFinding] = useState<boolean>(false);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Puff />,
  });

  const navigate = useNavigate();

  const handleContinueClick = async () => {
    setIsFinding(true);
    setTimeout(() => {
      setIsFinding(false);
    }, 1000);
    WalletManager.getWalletFromPrivateKey(key).then((publicKey: string) => {
      console.log(publicKey);
      navigate('/import/wallet', { state: { accounts: [publicKey] } });

    }).catch(() => {
      setIsValidKey(false);
    });
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value && key) setIsContinue(false);
    else setIsContinue(true);
  }

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
    setIsValidKey(true);
    if (e.target.value && name) setIsContinue(false);
    else setIsContinue(true);
  }

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {
        isFinding ? <div className="h-screen flex flex-col items-center justify-center">
          <section className="w-[50px] h-[50px]" {...containerProps}>{indicatorEl}</section>
          <h1 className="text-white mt-12 text-2xl">Finding your wallet...</h1>
        </div>
          : <>
            <ImportHeader success={false} content="Import Wallet Key" />

            <div className="w-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
              <div className="w-full flex flex-col items-center">
                <img src={secure} className="h-32 mt-8" alt="secure" />
                <div className="w-full mt-4">
                  <div className='px-4 py-2 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer'>
                    <p className="border-none text-[#93EBD3]">Name</p>
                    <input className="border-none bg-[#171121] text-white outline-none" placeholder="Name" value={name} onChange={handleChangeName}></input>
                  </div>
                  <div className={'px-4 py-2 rounded-md bg-[#171121] border border-solid items-center mt-4 cursor-pointer ' + (isValidKey ? "border-[#362854]" : "border-red-600")}>
                    <p className="border-none text-[#93EBD3]">Wallet Key</p>
                    <input className="w-full border-none bg-[#171121] text-white outline-none" placeholder="Wallet Key" value={key} onChange={handleChangeKey}></input>
                  </div>
                  {
                    isValidKey ?
                      <></>
                      : <div className="flex text-red-600 mt-2">
                        <XCircle /><p className="ml-1">Invalid wallet key</p>
                      </div>
                  }
                </div>
              </div>
              <Button disabled={isContinue} className='w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleContinueClick}>Continue</Button>
            </div>
          </>
      }
    </div>
  );
}