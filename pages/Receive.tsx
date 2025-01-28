// import {  useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import ImportHeader from "@/components/ImportHeader";
// import { cryptoDataType } from "@/lib/cryptoDataType";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useWalletStore } from "@/stores/walletStore";
// import { WalletManager } from "@/lib/WalletManager";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { useRef } from "react";

export default function Receive() {

  const { selectedAccount } = useWalletStore();

  const copyToClipboard = () => {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(selectedAccount?.publicKey || '');
    } else {
      document.execCommand("copy", true, selectedAccount?.publicKey || '');
    }
    toast({
      title: 'Success',
      description: 'Copied to Clipboard',
    });
  };


  const qrCodeRef = useRef<SVGSVGElement | null>(null);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const svg = qrCodeRef.current;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Create an SVG image URL
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Set canvas size to the QR code size
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Convert canvas to PNG image and trigger the download
        const imgURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgURL;
        link.download = "solana-wallet-qr.png";
        link.click();
      };
      img.src = url;
    }
  };


  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >

      <ImportHeader success={false} content="Receive" />

      <div className="w-full h-screen overflow-auto scrollbar-none flex flex-col justify-between flex-1 py-6 px-4 text-red items-center">
        <div className="w-full items-center">
          <QRCodeDisplay walletAddress={selectedAccount?.publicKey || ''} qrCodeRef={qrCodeRef} />
          <div className="w-full px-2 py-1 bg-[#171121] border border-[#8884FF] rounded-lg mt-4">
            <div className="w-full text-white">
              <p className="font-bold">Wallet 1</p>
              <div className="w-full flex justify-between">
                <p className="opacity-70">{selectedAccount?.publicKey && ('(' + selectedAccount?.publicKey.slice(0, 6) + '...' + selectedAccount?.publicKey.slice(-10) + ')')}</p>
                <CopyIcon className="scale-x-[-1] ml-3 cursor-pointer" onClick={copyToClipboard} />
              </div>
            </div>
          </div>
          <p className="text-white mt-3">This address can only be used to receive compatible tokens.</p>
        </div>
        <Button className='w-full mx-auto h-[50px] rounded-full bg-gradient-to-r from-[#FFFFFF]-0 to-[#FFFFFF] text-[17px]-100 text-white border border-solid border-white' onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}