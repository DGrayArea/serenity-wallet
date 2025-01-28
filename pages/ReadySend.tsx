import { useLocation, useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import ImportHeader from "@/components/ImportHeader";
import { cryptoDataType } from "@/lib/cryptoDataType";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useWalletStore } from "@/stores/walletStore";
import { WalletManager } from "@/lib/WalletManager";

export default function ReadySend() {

  const location = useLocation();
  const navigate = useNavigate();
  const data: cryptoDataType[] = location.state.data;
  const selectToken: number = location.state.selectToken;
  const amount: number = location.state.amount;
  const address: string = location.state.address;

  const { selectedAccount } = useWalletStore();

  const copyToClipboard = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(address);
    } else {
      document.execCommand("copy", true, address);
    }
    toast({
      title: 'Success',
      description: 'Copied to Clipboard',
    });
  };

  const handleSend = async () => {
    try {

      const signature = selectToken ? await WalletManager.sendToken(selectedAccount?.publicKey || '', address, data[selectToken].mint, amount)
        : await WalletManager.sendSol(selectedAccount?.publicKey || '', address, amount);
      console.log(signature);
      navigate('/send/success', { state: { text: `${amount} ${data[selectToken].ticker} Sent!` } });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >

      <ImportHeader success={false} content="Send" />

      <div className="w-full h-screen overflow-auto scrollbar-none flex flex-col justify-between flex-1 py-6 px-4 text-red items-center">
        <div className="w-full px-2 py-3 bg-[#171121] border border-[#8884FF] rounded-lg">
          <div className="w-full items-center text-center border-b border-b-gray-600 pb-6">
            <img src={data[selectToken].image} alt={data[selectToken].ticker} className="mx-auto w-8 h-8 mt-4 rounded-full" />
            <p className="text-white opacity-70 mt-4">You're going to send</p>
            <div className="w-min mx-auto text-white flex items-center text-center mt-4">
              <p className="text-2xl font-bold">{amount}</p>
              <p className="opacity-70">&nbsp;{data[selectToken].ticker}</p>
            </div>
          </div>
          <div className="w-full py-4 text-white border-b border-b-gray-600">
            <p className="opacity-70">To</p>
            <div className="w-full flex justify-between">
              <p>{address.slice(0, 5) + '...' + address.slice(-5)}</p>
              <CopyIcon className="scale-x-[-1] ml-3 cursor-pointer" onClick={copyToClipboard} />
            </div>
            <p className="opacity-70 mt-1">Received Amount</p>
            <p>{amount + ' ' + data[selectToken].ticker}</p>
          </div>
          <div className="py-4 flex w-full text-white border-b border-b-gray-600">
            <p>Total (USD)</p>
            <p>${(amount * data[selectToken].usdPrice).toFixed(2)}</p>
          </div>
          <div className="py-4 flex w-full text-[#54D6FF]">
            <p>Avoid scams and frauds if you're sending to<br />an unknown address.</p>
          </div>
        </div>
        <Button className='w-full mx-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleSend}>Send Now</Button>
      </div>
    </div>
  );
}