import { useLocation, useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import ImportHeader from "@/components/ImportHeader";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useWalletStore } from "@/stores/walletStore";
import { WalletManager } from "@/lib/WalletManager";

export default function ReadySendNFT() {

  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nft: any = location.state.nft;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const detail: any = location.state.floorPrice;
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
    console.log(detail);

    try {
      await WalletManager.sendToken(selectedAccount?.publicKey || '', address, nft.id, 0);
      navigate('/send/success', { state: { text: `${nft?.content?.metadata?.name} Sent!` } });
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
            <p className="text-white opacity-70 mt-4">You're going to send</p>
            <p className="text-white text-2xl font-bold">{nft?.content?.metadata?.name}</p>
            <img src={nft?.content?.files?.[0]?.uri} alt={'NFT'} className="mx-auto w-60 h-60 mt-4 rounded-lg" />
          </div>
          <div className="w-full py-4 text-white border-b border-b-gray-600">
            <p className="opacity-70">To</p>
            <div className="w-full flex justify-between">
              <p>{address.slice(0, 5) + '...' + address.slice(-5)}</p>
              <CopyIcon className="scale-x-[-1] ml-3 cursor-pointer" onClick={copyToClipboard} />
            </div>
            <p className="opacity-70 mt-1">Received Amount</p>
            <p>{detail?.data && detail?.data?.data?.length > 0
              ? Number(detail?.data?.data[0]?.stats.price)
              : "0"}{" "}
              SOL</p>
          </div>
          <div className="py-4 flex w-full justify-between text-white border-b border-b-gray-600">
            <p>Total (USD)</p>
            <p>${488.10}</p>
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