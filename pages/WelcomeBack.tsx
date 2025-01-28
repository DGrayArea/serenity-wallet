/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
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
import { useWalletStore } from "@/stores/walletStore";

const WelcomeBack: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const navigate = useNavigate(); 
  const { toast } = useToast();

  // Handle PIN input changes
  const handlePinChange = (value: string) => {
    setPin(value);
    setErrorMessage(""); 
  };

  // Handle unlocking the wallet
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
      if (useWalletStore.getState().isShowSeed) {
        useWalletStore.getState().setIsShowSeed(false);
        navigate("/show-seed-phrase");
      } else {
        navigate("/home"); 
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to unlock wallet");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to unlock wallet",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPin = () => {
    navigate("/import/seed/forgot/pin");
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} />

      <div className="flex flex-col justify-between flex-1 py-3">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-sm text-center mb-4 text-[#D4CAFF]"> build
            Enter your PIN to access the wallet
          </p>
          <InputOTP maxLength={6} value={pin} onChange={handlePinChange}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  className={
                    pin.length > 0 && pin.length < 6
                      ? "border-blue-700"
                      : errorMessage
                      ? "border-red-500"
                      : ""
                  }
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {errorMessage && (
            <p className="text-sm text-center mb-4 text-red-500">
              {errorMessage}
            </p>
          )}
          <h1
            className="text-[13.33px] font-bold leading-normal text-transparent bg-clip-text bg-gradient-to-b from-white to-[rgba(255,255,255,0.16)] tracking-[0.533px] mt-6 cursor-pointer"
            onClick={handleForgotPin} // Forgot PIN handler
          >
            Forgot PIN
          </h1>
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

export default WelcomeBack;
