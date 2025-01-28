import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import backgroundSvg from '../assets/background.svg';
import SuccessAvatarAlt from '../assets/SuccessAvatarAlt.svg';

export default function StakeWithdrawalConfirming() {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const stakeDetails = location.state?.stakeDetails || {
    name: "Unknown Validator",
    amount: 0,
    icon: "",
    rentReserve: 0,
    lastReward: 0
  };
  const { withdrawAmount } = location.state;

  useEffect(() => {
    // Simulate transaction confirmation
    const timer = setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isSubmitting) {
    return (
      <div 
        className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4"
        style={{ backgroundImage: `url(${backgroundSvg})` }}
      >
        <div className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto">
          <div className="flex space-x-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.5s]"></div>
          </div>

          <h1 className="text-xl font-semibold text-white mb-3 text-center">
            Submitting Transaction
          </h1>
          
          <p className="text-white/70 text-center text-sm">
            Withdrawing {withdrawAmount} SOL from {stakeDetails.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between px-4 py-8"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="text-[#93FF50] text-6xl mb-8">
          <img src={SuccessAvatarAlt} alt="Success" />
        </div>

        <p className="text-[#93FF50] text-center text-lg mb-2">
          Your withdrawal request for
        </p>
        <p className="text-[#93FF50] text-center text-lg">
          {withdrawAmount} SOL has been submitted!
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