import { toast } from "@/hooks/use-toast";
import { useClickOutside } from "@/hooks/useClickOutSide";
import { cn } from "@/lib/utils";
import { CopyIcon, QrCode } from "lucide-react";
import { useRef } from "react";

type PropsType = {
  publicKey: string,
  className: string,
  onClickOutside: () => void
}

const QRTab = (props: PropsType) => {

  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, props.onClickOutside)

  const publicKey = props.publicKey;
  const className = props.className;

  const truncateAddress = (address: string) => {
    return address.length > 13
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  };

  const copyToClipboard = () => {
    console.log(publicKey);

    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(publicKey);
    } else {
      document.execCommand("copy", true, publicKey);
    }
    toast({
      title: 'Success',
      description: 'Copied to Clipboard',
    });
  };

  return (
    <div ref={ref} className={cn("w-64 px-2 py-4 bg-white bg-opacity-15 rounded-lg backdrop-blur-lg", className)}>
      <div className="w-full flex justify-between text-white">
        <p>{truncateAddress(publicKey)}</p>
        <CopyIcon className="scale-x-[-1] ml-3 cursor-pointer" onClick={copyToClipboard} />
      </div>
      <div className="w-full flex justify-between text-white mt-3">
        <p>Show QR Code</p>
        <QrCode className="h-6 w-6 text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default QRTab;
