import { ChevronLeft } from 'lucide-react';
import backgroundSvg from '../assets/background.svg';
import RusticIcon from '../assets/Rustic.svg';
import { Link } from 'react-router-dom';

interface StakeInfo {
  name: string;
  amount: number;
  status: 'Activating' | 'Deactivating';
  icon: string;
}

export default function StakePage() {
  const stakes: StakeInfo[] = [
    {
      name: 'Rustiq Technology',
      amount: 2,
      status: 'Activating',
      icon: RusticIcon
    },
    {
      name: 'Rustiq Technology',
      amount: 2,
      status: 'Deactivating',
      icon: RusticIcon
    }
  ];

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center border-b border-white/20 w-full py-3 px-4">
          <Link to="/">
            <ChevronLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="ml-2 text-white text-lg">Your Stake</span>
        </div>
      </div>

      {/* Add Stake Button */}
      <div className="px-4 mb-6">
        <Link to='/validator'>
          <button className="w-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white py-4 rounded-full text-lg">
            Add Stake
          </button>
        </Link>
      </div>

      {/* Stakes List */}
      <div className="px-4 space-y-3">
        {stakes.map((stake, index) => (
          <Link to='/stake/add'
            key={index}
            className="bg-[#171121]/80 backdrop-blur-lg rounded-xl p-4 border border-main-300 flex justify-between items-center"
          >
            <div className="flex items-center">
              <img src={stake.icon} alt={stake.name} className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                <div className="text-white">{stake.name}</div>
                <div className={`text-sm font-semibold ${stake.status === 'Activating' ? 'text-system-warning' : 'text-system-danger'
                  }`}>
                  {stake.status}
                </div>
              </div>
            </div>
            <div className="text-white text-lg">{stake.amount} SOL</div>
          </Link>
        ))}
      </div>
    </div>
  );
} 