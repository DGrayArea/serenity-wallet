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

export default function CreatePin() {
  const [pin, setPin] = useState<string>("");
  const [validClass, setValidClass] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePinChange = (value: string) => {
    setPin(value);
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
        description: "PIN created successfully",
      });
      navigate("/created", {
        state: { text: "Your PIN ID has successfully set up!" },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} />

      <div className="flex flex-col justify-between flex-1 py-3 text-red">
        <div className="flex flex-col gap-1 py-6 text-white items-center">
          <h1 className="text-2xl font-bold">Create Pin</h1>
          <p className="text-sm text-center mb-4">
            Create a 6-digit PIN before creating your wallet
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
        </div>

        <Button
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors rounded-full"
          onClick={handleSubmit}
          disabled={pin.length !== 6 || isLoading}
        >
          {isLoading ? "Creating..." : "NEXT"}
        </Button>
      </div>
    </div>
  );
}
