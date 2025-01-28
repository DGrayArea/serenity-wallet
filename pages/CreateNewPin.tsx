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

export default function CreateNewPin() {
  const [pin, setPin] = useState<string>("");
  const [validClass, setValidClass] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePinChange = (value: string) => {
    setPin(value);
    setValidClass("");
  };

  const handleSubmit = async () => {
    if (pin.length !== 6) {
      setValidClass("text-red-600");
      toast({
        variant: "destructive",
        title: "Invalid PIN",
        description: "PIN must be 6 digits long",
      });
      return;
    }

    setIsLoading(true);
    try {
      await WalletManager.createPin(pin);
      toast({
        title: "Success",
        description: "New PIN created successfully",
      });
      navigate("/home");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create New PIN",
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

      <div className="flex flex-col justify-between flex-1 py-3 text-red">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <h1 className="text-2xl font-bold">New PIN</h1>
          <p className="text-sm text-center mb-4 text-[#D4CAFF]">
            Enter a new 6-digit PIN
          </p>
          <InputOTP maxLength={6} value={pin} onChange={handlePinChange}>
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  aria-label={`Digit ${index + 1}`}
                  aria-invalid={validClass ? true : false}
                  className={
                    pin.length > 0 && pin.length < 6
                      ? "border-blue-700"
                      : validClass
                  }
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {validClass && (
            <p className={`${validClass} mt-2 text-sm`}>
              PIN must be exactly 6 digits long
            </p>
          )}
        </div>

        <Button
          className={`w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={pin.length !== 6 || isLoading}
        >
          {isLoading ? "Creating..." : "NEXT"}
        </Button>
      </div>
    </div>
  );
}
