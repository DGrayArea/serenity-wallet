import SecurityAlertDialog from '@/components/SecurityAlertDialog';
import backgroundSvg from '../assets/background.svg';
import keySvg from "../assets/key.svg";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SecureWallet = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSecure = () => {
    navigate('/secure-wallet-workflow');
  }
  const handleRemind = () => {
    setIsDialogOpen(true);
  }
  return (
    <div
      className="relative pb-6 w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-end gap-[280px]"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className='flex flex-col px-5 w-full h-full'>
        <div className='grow flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center'>

            <img
              src={keySvg}
              className='w-[180px] h-auto'
              alt='key'
            />
            <div className='mt-8 text-[34px] text-white text-center'>
              Secure <br />
              Your Wallet
            </div>
            <div>
              <span className='text-[16px] font-light text-[#C7F5E4] tracking-wide'>
                Protect your wallet by saving your seed phrase in a place you trust.
              </span>
              <span className='text-[16px] font-light text-[#D4CAFF] tracking-wide'>
                It's the only way to recover your wallet if you get locked out or get a new device.
              </span>
            </div>
          </div>
        </div>
        <Button
          className="w-full h-[50px] rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={handleSecure}
        >
          Secure Now
        </Button>
        <Button
          className="mt-4 w-full h-[50px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF]"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
          onClick={handleRemind}
        >
          Remind Me Later
        </Button>
        <SecurityAlertDialog open={isDialogOpen} />
      </div>
    </div>
  )
}

export default SecureWallet