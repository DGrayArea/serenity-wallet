import backgroundSvg from '../assets/background.svg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';
import chainSvg from '../assets/chain.svg';

const ImportWalletSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/secure-wallet");
  }

  return (
    <div
      className="relative w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className='absolute top-0 px-5 w-full h-[44px] flex items-center backdrop-blur-md shadow-sm'>
        <div className='cursor-pointer flex items-center gap-2'>
          <img src={logoSvg} width={70} height={32} />
        </div>
      </div>
      <div className='flex-1 flex flex-col items-center px-5'>
        <div className='relative w-full h-full flex flex-col text-white'>
          <div className='grow flex flex-col justify-center items-center'>
            <div className='flex flex-col items-center'>
              <img
                src={chainSvg}
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
          <div className='absolute bottom-0 w-full pb-5'>
            <Button
              className="w-full h-[50px] rounded-full hover:bg-purple-700"
              style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
              onClick={handleClick}
            >
              Great!
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImportWalletSuccess
