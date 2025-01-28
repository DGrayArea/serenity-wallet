import { cn } from "@/lib/utils";
import { ArrowLeft, Eye, FileIcon, KeyRoundIcon, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  handleCancel: () => void
}

const AddConnectWallet = (props: PropsType) => {

  const navigate = useNavigate();

  return (
    <div className={cn("w-full bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-50 border-t border-[#947EAE] rounded-lg absolute bottom-0")}>
      <div className='flex justify-between p-4'>
        <ArrowLeft className="text-white" onClick={props.handleCancel} />
        <h1 className="text-white text-xl">Add / Connect Wallet</h1>
      </div>
      <div className="p-4">
        <div className='flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer' onClick={() => navigate('/create/account')}>
          <PlusCircle className='text-white' size={30} />
          <div className='ml-3'>
            <p className='text-white text-lg' >Create New Account</p>
            <p className='text-white opacity-60 text-base' >Add a new account</p>
          </div>
        </div>
        <div className='flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer' onClick={() => navigate('/import/seed')}>
          <FileIcon className='text-white' size={30} />
          <div className='ml-3'>
            <p className='text-white text-lg' >Import Seed Phrase</p>
            <p className='text-white opacity-60 text-base' >Import accounts from another wallet</p>
          </div>
        </div>
        <div className='flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer' onClick={() => navigate('/import/key')}>
          <KeyRoundIcon className='text-white' size={30} />
          <div className='ml-3'>
            <p className='text-white text-lg' >Import Private Key</p>
            <p className='text-white opacity-60 text-base' >Import a single-chain account</p>
          </div>
        </div>
        <div className='flex p-4 rounded-md bg-[#171121] border border-solid border-[#362854] items-center mt-4 cursor-pointer' onClick={() => navigate('/watch-address')}>
          <Eye className='text-white' size={30} />
          <div className='ml-3'>
            <p className='text-white text-lg' >Watch Address</p>
            <p className='text-white opacity-60 text-base' >Track any public wallet address</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConnectWallet;
