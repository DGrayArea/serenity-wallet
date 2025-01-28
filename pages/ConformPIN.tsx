import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { WalletManager } from "@/lib/WalletManager";
import { useToast } from "@/hooks/use-toast";

export default function ConfirmPIN() {
  const [pin, setPin] = useState<string>("");
  const [validClass, setValidClass] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePinChange = (value: string) => {
    setPin(value);
    setValidClass("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    if (pin.length !== 6) {
      setValidClass("border-red-600");
      toast({
        variant: "destructive",
        title: "Invalid PIN",
        description: "PIN must be 6 digits long",
      });
      return;
    }

    try {
      const verifyPIN = await WalletManager.verifyPin(pin);
      if (verifyPIN) navigate("/security/newPIN", { state: { oldPIN: pin } });
      else {
        setValidClass("border-red-600");
        setErrorMessage("Incorrect PIN");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="New PIN" className="sticky top-0 z-50" />

      <div className="flex flex-col justify-between flex-1 py-3 text-red">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <h1 className="text-2xl font-bold">Current PIN</h1>
          <p className="text-sm text-center mb-4">Enter your current PIN</p>
          <InputOTP maxLength={6} value={pin} onChange={handlePinChange}>
            <InputOTPGroup>
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                security={"true"}
                index={0}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                security={"true"}
                index={1}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                security={"true"}
                index={2}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                security={"true"}
                index={3}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                security={"true"}
                index={4}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                security={"true"}
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-left mb-2 text-red-600">{errorMessage}</p>
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
          onClick={handleSubmit}
          disabled={pin.length !== 6 || errorMessage !== ""}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
