import React, { useState } from "react";
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

interface UnlockWalletProps {
  onUnlock: () => void;
}

const UnlockWallet: React.FC<UnlockWalletProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>("");
  const [validClass, setValidClass] = useState<string>("");
  const [invalidText, setInvalidText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handlePinChange = (value: string) => {
    setPin(value);
    setValidClass("");
    setInvalidText("");
  };

  const handleUnlock = async () => {
    if (pin.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid PIN",
        description: "PIN must be 6 digits long",
      });
      return;
    }

    setIsLoading(true);
    try {
      await WalletManager.unlockWallet(pin);
      toast({
        title: "Success",
        description: "Wallet unlocked successfully",
      });
      onUnlock();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setValidClass("border-red-500");
      setInvalidText(error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to unlock wallet",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} />

      <div className="flex flex-col justify-between flex-1 py-3">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <h1 className="text-2xl font-bold">Unlock Wallet</h1>
          <p className="text-sm text-center mb-4">
            Enter your 6-digit PIN to unlock your wallet
          </p>
          <InputOTP maxLength={6} value={pin} onChange={handlePinChange}>
            <InputOTPGroup>
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                index={0}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                index={1}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                index={2}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                index={3}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                index={4}
              />
              <InputOTPSlot
                className={
                  pin.length > 0 && pin.length < 6
                    ? "border-blue-700"
                    : validClass
                }
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-center mb-4 text-red-500">{invalidText}</p>
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
          onClick={handleUnlock}
          disabled={pin.length !== 6 || isLoading}
        >
          {isLoading ? "Unlocking..." : "Unlock"}
        </Button>
      </div>
    </div>
  );
};

export default UnlockWallet;