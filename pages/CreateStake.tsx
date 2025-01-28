import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundSvg from '../assets/background.svg';
import { useState } from 'react';

interface ValidatorInfo {
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  commission: number;
  delegators: number;
}

export default function CreateStake() {
  const navigate = useNavigate();
  const [stakeAmount, setStakeAmount] = useState<string>('2');
  const balance = 14; // This would come from your wallet state in production

  const validator: ValidatorInfo = {
    name: 'Rustiq Technology',
    amount: 248.3746,
    percentage: 6.99,
    commission: 9,
    delegators: 0,
    icon: '/src/assets/Rustic.svg'
  };

  const handleMaxClick = () => {
    setStakeAmount(balance.toString());
  };

  const handleStake = () => {
    navigate('/stake/confirmation', {
      state: {
        amount: stakeAmount,
        validator: validator
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center border-b border-white/20 w-full py-3 px-4">
          <Link to="/validator">
            <ChevronLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="ml-2 text-white text-lg">Stake</span>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="bg-[#171121]/80 backdrop-blur-lg rounded-xl p-6 border border-main-300">
          <div className="text-center mb-6">
            <p className="text-white text-sm">Choose how much SOL you'd like to stake with this validator</p>
          </div>

          {/* Amount Input */}
          <div className="relative mb-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 border border-white/30 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-transparent text-white text-2xl w-full outline-none h-8"
                      placeholder="0"
                    />
                  </div>
                  <span className="text-main-200 text-lg">SOL</span>
                </div>
              </div>
              <button
                onClick={handleMaxClick}
                className="px-6 h-[54px] rounded-2xl bg-transparent border border-white/30 text-white text-sm transition-colors"
              >
                Max
              </button>
            </div>
            <div className="text-main-200 text-sm mt-2">Balance: {balance} SOL</div>
          </div>

          {/* Validator Info */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="text-main-200">Validator • <span className="text-white">Edit</span></div>
              <div className="flex items-center">
                <img src={validator.icon} alt={validator.name} className="w-6 h-6 rounded-full mr-2" />
                <span className="text-main-100 font-semibold">{validator.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-main-200">Estimated APY</span>
                <span className="text-white">{validator.percentage}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-main-200">Commission</span>
                <span className="text-white">{validator.commission}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-main-200">Total Stake</span>
                <span className="text-white">{validator.amount} SOL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-main-200"># of Delegators</span>
                <span className="text-white">{validator.delegators}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stake Button */}
        <button
          className="w-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white py-4 rounded-full text-lg mt-6"
          onClick={handleStake}
        >
          Stake
        </button>
      </div>
    </div>
  );
} 