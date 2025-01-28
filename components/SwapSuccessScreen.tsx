import backgroundSvg from '../assets/background.svg';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SuccessAvatarAlt from '../assets/SuccessAvatarAlt.svg';

interface SwapSuccessScreenProps {
  payAmount: number;
  paySymbol: string;
  receiveAmount: number;
  receiveSymbol: string;
}

export default function SwapSuccessScreen({ 
  payAmount, 
  paySymbol, 
  receiveAmount, 
  receiveSymbol 
}: SwapSuccessScreenProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between px-4 py-8"
      style={{ 
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        {/* Success Icon - You might want to replace this with your actual icon */}
        <div className="text-[#93FF50] text-6xl mb-8">
          <img src={SuccessAvatarAlt} alt="Success" />
        </div>

        <p className="text-[#93FF50] text-center text-lg mb-2">
          Your {payAmount} {paySymbol} has successfully
        </p>
        <p className="text-[#93FF50] text-center text-lg">
          swapped into {receiveAmount} {receiveSymbol}!
        </p>
      </div>

      <Button
        className="w-full max-w-sm h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white text-lg"
        onClick={() => navigate('/home')}
      >
        Great!
      </Button>
    </div>
  );
} 