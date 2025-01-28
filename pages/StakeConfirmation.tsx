import { useNavigate, useLocation } from 'react-router-dom';
import backgroundSvg from '../assets/background.svg';
import SuccessAvatarAlt from '../assets/SuccessAvatarAlt.svg';

export default function StakeConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  return (
    <div 
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between px-4 py-8"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="text-system-success text-6xl mb-8">
         <img src={SuccessAvatarAlt} alt="Success" className="w-40 h-40" />
        </div>

        <p className="text-system-success text-center text-lg mb-2">
          You successfully
        </p>
        <p className="text-system-success text-center text-lg">
          staked {amount} SOL!
        </p>
      </div>

      <button
        className="w-full max-w-sm h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white text-lg"
        onClick={() => navigate('/stake')}
      >
        Great!
      </button>
    </div>
  );
} 