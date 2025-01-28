import { X } from 'lucide-react';
import { useState } from 'react';
import backgroundSvg from '../assets/background.svg';
import RusticIcon from '../assets/Rustic.svg'
import { Link } from 'react-router-dom';

interface ValidatorInfo {
  name: string;
  amount: number;
  percentage: number;
  icon: string;
}

export default function ValidatorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const validators: ValidatorInfo[] = [
    {
      name: 'Rustiq Technology',
      amount: 347384,
      percentage: 7,
      icon: RusticIcon
    },
    {
      name: 'Rustiq Technology',
      amount: 347384,
      percentage: 7,
      icon: RusticIcon
    },
    {
      name: 'Rustiq Technology', 
      amount: 347384,
      percentage: 7,
      icon: RusticIcon
    },
    {
      name: 'Rustiq Technology',
      amount: 347384,
      percentage: 7,
      icon: RusticIcon
    },
    {
      name: 'Rustiq Technology',
      amount: 347384,
      percentage: 7,
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
          <Link to="/stake">
            <X className="w-6 h-6 text-white" />
          </Link>
          <span className="ml-2 text-white text-lg">Choose Validator</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent backdrop-blur-lg text-white px-4 py-3 rounded-lg border-2 border-white/20 outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

<div className=" border-t-2 border-neutral-700 py-5 bg-[#0D09138F] rounded-t-xl h-full">
      {/* Info Headers */}
      <div className="px-4 flex justify-between mb-4">
        <div className="flex items-center text-white text-sm">
          Validator
          <div className="w-4 h-4 ml-1 rounded-full border border-white flex items-center justify-center">
            <span className="text-xs">i</span>
          </div>
        </div>
        <div className="flex items-center text-white text-sm">
          Est. APY
          <div className="w-4 h-4 ml-1 rounded-full border border-white flex items-center justify-center">
            <span className="text-xs">i</span>
          </div>
        </div>
      </div>

      {/* Validator List */}
      <div className="px-4 space-y-3">
        {validators.map((validator, index) => (
          <Link to="/stake/create"
            key={index}
            className="bg-[#171121]/80 backdrop-blur-lg rounded-xl p-4 border border-main-300 flex justify-between items-center"
          >
            <div className="flex items-center">
              <img src={validator.icon} alt={validator.name} className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                <div className="text-white">{validator.name}</div>
                <div className="text-main-100 text-sm">{validator.amount.toLocaleString()} SOL</div>
              </div>
            </div>
            <div className="text-white text-lg">{validator.percentage}%</div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
} 