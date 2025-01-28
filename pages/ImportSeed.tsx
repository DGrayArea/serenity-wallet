import { useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { WalletManager } from "@/lib/WalletManager";
import ImportHeader from "@/components/ImportHeader";
import { useLoading, Puff } from '@agney/react-loading';

export default function ImportSeed() {
  const [seedPhrase, setSeedPhrase] = useState<string[]>(Array(12).fill(""));
  const [disable, setDisable] = useState<boolean>(true);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
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
    const stringSeed = seedPhrase.join(' ');
    WalletManager.getWalletFromSeed(stringSeed).then((publicKey: string) => {
      navigate('/import/wallet', { state: { accounts: [publicKey] } });

    }).catch(() => {
      setIsInvalid(true);
    });
    // const exitSeedPhrase: string = await WalletManager.getSeedPhrase();
    // console.log(exitSeedPhrase.split(' ').toString());
    // console.log(seedPhrase.toString());
    // console.log(exitSeedPhrase.split(' ').toString() == seedPhrase.toString());

    // if (exitSeedPhrase.split(' ').toString() === seedPhrase.toString())
    //   navigate('/import/wallet');
    // else setIsInvalid(true);


  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Remove the index prefix (e.g., "1. ") if present
    const cleanValue = value.replace(/^\d+\.\s*/, '');
    
    // Check if this is a paste operation with multiple words
    if (cleanValue.includes(',') || cleanValue.includes(' ')) {
      const words = cleanValue.replace(/,/g, ' ').split(' ').filter(word => word.length > 0);
      
      // If we have exactly 12 words, populate all boxes
      if (words.length === 12) {
        setSeedPhrase(words);
        setDisable(false);
        return;
      }
    }

    // Handle single word input
    const phrase = [...seedPhrase];
    phrase[index] = cleanValue;
    
    // Check if all fields are filled
    const flag = phrase.some(seed => !seed);
    setDisable(flag);
    setSeedPhrase(phrase);
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
            <ImportHeader success={false} content="Import Seed Phrase" />

            <div className="w-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
              <div className="w-full flex flex-col items-center">
                <h1 className='text-2xl text-white font-bold font-sans tracking-widest mt-4 text-center'>Enter your<br />Wallet's Seed Phrase</h1>
                <div className="w-full relative mt-8">
                  <div className="border boder-solid rounded-lg border-white p-3 flex flex-wrap justify-between backdrop-blur-lg">
                    {
                      seedPhrase.map((phrase: string, index: number) => (
                        <input 
                          key={`seed-input-${index}`}
                          className="bg-white p-2 w-[32%] mt-2 text-center rounded-sm" 
                          value={`${index + 1}. ${phrase}`} 
                          onChange={(e) => handleChange(e, index)}
                        />
                      ))
                    }
                  </div>
                </div>
                {
                  isInvalid ? <p className="text-red-600 text-left w-full">Invalid seed phrase</p> : <></>
                }
              </div>
              <Button disabled={disable} className='w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleContinueClick}>Continue</Button>
            </div>
          </>
      }
    </div>
  );
}