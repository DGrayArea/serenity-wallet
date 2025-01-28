import { useLocation, useNavigate } from "react-router-dom";
import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { WalletManager } from "@/lib/WalletManager";
import insight from "../assets/Insight.svg";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SecureStep() {
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [hiddenSeed, setHiddenSeed] = useState<string>("");
  const [confirmSeed, setConfirmSeed] = useState<boolean>(false);
  const [validFirstSeed, setValidFirstSeed] = useState<string>("");
  const [validSecondSeed, setValidSecondSeed] = useState<string>("");
  const [validThirdSeed, setValidThirdSeed] = useState<string>("");
  const [firstSeed, setFirstSeed] = useState<string>("");
  const [secondSeed, setSecondSeed] = useState<string>("");
  const [thirdSeed, setThirdSeed] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();
  const phrase: string = location.state.phrase;
  const { toast } = useToast();

  const generateSeedPhrase = useCallback(async () => {
    try {
      console.log(phrase);

      setSeedPhrase(phrase.split(" "));
    } catch (error) {
      console.error("Error generating seed phrase:", error);
    }
  }, []);

  const copyToClipboard = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(seedPhrase.toString());
    } else {
      document.execCommand("copy", true, seedPhrase.toString());
    }
    toast({
      title: "Success",
      description: "Copied to Clipboard",
    });
  };

  const handleContinueClick = () => {
    if (confirmSeed) {
      navigate("/secure/wallet/success");
    } else {
      setConfirmSeed(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value =
      e.target.value.split(" ").length > 1 ? e.target.value.split(" ")[1] : "";

    if (index === 5) {
      setFirstSeed(value);
      if (value === seedPhrase[5]) {
        setValidFirstSeed("bg-lime-400 border-lime-700 text-lime-700");
        if (secondSeed === seedPhrase[7] && thirdSeed === seedPhrase[9])
          setDisable(false);
      } else {
        setValidFirstSeed("bg-red-400 border-red-700 text-red-700");
        setDisable(true);
      }
    }
    if (index === 7) {
      setSecondSeed(value);
      if (value === seedPhrase[7]) {
        setValidSecondSeed("bg-lime-400 border-lime-700 text-lime-700");
        if (firstSeed === seedPhrase[5] && thirdSeed === seedPhrase[9])
          setDisable(false);
      } else {
        setValidSecondSeed("bg-red-400 border-red-700 text-red-700");
        setDisable(true);
      }
    }
    if (index === 9) {
      setThirdSeed(value);
      if (value === seedPhrase[9]) {
        setValidThirdSeed("bg-lime-400 border-lime-700 text-lime-700");
        if (secondSeed === seedPhrase[7] && firstSeed === seedPhrase[5])
          setDisable(false);
      } else {
        setValidThirdSeed("bg-red-400 border-red-700 text-red-700");
        setDisable(true);
      }
    }
  };

  useEffect(() => {
    const checkWalletStatus = async () => {
      const locked = WalletManager.isWalletLocked();
      if (!locked) {
        generateSeedPhrase();
      }
    };

    checkWalletStatus();
  }, [generateSeedPhrase]);
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={1} className="sticky top-0 z-50"/>

      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl text-white font-bold font-sans tracking-widest mt-4 text-center">
            Write Down
          </h1>
          <h1 className="text-2xl text-white font-bold font-sans tracking-widest text-center">
            Your Seed Phrase
          </h1>
          {confirmSeed ? (
            <p className="bg-[#171121] w-full text-center py-6 rounded-lg text-white mt-4">
              Type in your key phrase below
            </p>
          ) : (
            <p className="text-white opacity-70 mt-4">
              Write it down on a paper and keep it in a safe place. You'll be
              asked to re-enter this phrase (in order) on the next step
            </p>
          )}
          <div className="w-full relative mt-8">
            <div className="border boder-solid rounded-lg border-white p-3 flex flex-wrap justify-between backdrop-blur-lg">
              {seedPhrase.map((phrase: string, index: number) => {
                if (confirmSeed && (index === 5 || index === 7 || index === 9))
                  return (
                    <input
                      className={
                        "bg-[#171121] border boder-solid rounded-lg border-indigo-400 text-white p-2 w-[32%] mt-2 text-center " +
                        (index === 5
                          ? validFirstSeed
                          : index === 7
                            ? validSecondSeed
                            : validThirdSeed)
                      }
                      value={
                        index +
                        1 +
                        ". " +
                        (index === 5
                          ? firstSeed
                          : index === 7
                            ? secondSeed
                            : thirdSeed)
                      }
                      onChange={(e) => handleChange(e, index)}
                    ></input>
                  );
                return (
                  <p
                    className={
                      "p-2 w-[32%] bg-white rounded-md text-center " +
                      (index > 2 ? "mt-2" : "")
                    }
                  >
                    {index + 1 + ". " + phrase}
                  </p>
                );
              })}
            </div>
            <div
              className={
                "w-full absolute h-full top-0 backdrop-blur-sm backdrop-brightness-[0.3] rounded-md " +
                hiddenSeed
              }
            ></div>
            <div
              className={
                "w-full flex flex-col items-center absolute top-0 text-center " +
                hiddenSeed
              }
              onClick={() => setHiddenSeed("hidden")}
            >
              <img src={insight} className="h-[15px] mt-[12%]" alt="Insight" />
              <p className="font-bold text-white mt-5">
                Tap to reveal
                <br />
                your seed phrase
              </p>
              <p className="text-white mt-1">
                Make sure no one
                <br />
                is watching your screen.
              </p>
            </div>
          </div>
          {confirmSeed ? (
            <></>
          ) : (
            <Button
              className="mt-4 w-[60%] mx-auto h-[40px] rounded-full bg-gradient-to-r from-[#FFFFFF]-0 to-[#FFFFFF] text-[17px]-100 text-white border border-solid border-white"
              onClick={copyToClipboard}
            >
              Copy to clipboard <CopyIcon className="scale-x-[-1] ml-3" />
            </Button>
          )}
        </div>
        <Button
          disabled={disable && confirmSeed}
          className="w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px] mt-4"
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
