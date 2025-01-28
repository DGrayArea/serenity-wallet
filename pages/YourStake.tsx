import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundSvg from '../assets/background.svg';
import RusticIcon from '../assets/Rustic.svg';
import { useState } from 'react';

interface StakeDetails {
  name: string;
  status: string;
  address: string;
  balance: number;
  rentReserve: number;
  activeStake: number;
  lastReward: string;
  icon: string;
}

export default function YourStake() {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleUnstakeClick = () => {
    navigate('/stake/withdrawal', {
      state: {
        stakeDetails: {
          name: stakeDetails.name,
          amount: stakeDetails.activeStake,
          icon: stakeDetails.icon
        }
      }
    });
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleConfirmUnstake = () => {
    // Add unstake logic here
    setShowDialog(false);
  };

  const stakeDetails: StakeDetails = {
    name: 'Rustiq Technology',
    status: 'Activating',
    address: 'ASwye2h...ud38exhk',
    balance: 1.03509,
    rentReserve: 0.00228,
    activeStake: 2,
    lastReward: '-',
    icon: RusticIcon
  };

  let canWithdraw = true;

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-6">
        <div className="flex items-center border-b border-white/20 w-full py-3 px-4">
          <Link to="/stake">
            <ChevronLeft className="w-6 h-6 text-white" />
          </Link>
          <span className="ml-2 text-white text-lg">Your Stake</span>
        </div>
      </div>

      {/* Address Display */}
      <div className="w-full px-4 py-3">
        <div className="w-full bg-transparent/10 backdrop-blur-sm text-white py-3 px-4 rounded-full text-center">
          {stakeDetails.address}
        </div>
      </div>

      {/* Main Stake Card */}
      <div className="mx-4">
        <div className="bg-[#171121]/80 backdrop-blur-lg rounded-2xl p-6 border border-main-300">
          <h2 className="text-2xl font-bold text-white mb-3">Your Stake</h2>
          <p className="text-main-100 text-sm mb-6">
            Your SOL is currently staked with a validator. You'll need to unstake to access these funds.
          </p>

          {/* Validator Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src={stakeDetails.icon} alt={stakeDetails.name} className="w-10 h-10 rounded-full" />
              <div className="ml-3">
                <div className="text-white font-semibold">{stakeDetails.name}</div>
              </div>
            </div>
            <div className="text-system-success text-sm font-semibold">
              {stakeDetails.status}
            </div>
          </div>

          {/* Stake Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-main-200">Address</span>
              <span className="text-white">{stakeDetails.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-main-200">Balance</span>
              <span className="text-white">{stakeDetails.balance} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-main-200">Rent Reserve</span>
              <span className="text-white">{stakeDetails.rentReserve} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-main-200">Active Stake</span>
              <span className="text-white">{stakeDetails.activeStake} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-main-200">Last Reward</span>
              <span className="text-white">{stakeDetails.lastReward}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unstake Button */}
      {!canWithdraw && (
        <div className="p-4">
          <Link to='/stake'>
            <button
              className="w-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white py-3 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUnstakeClick}
            >
              Unstake
            </button>
          </Link>
        </div>
      )}

      {canWithdraw && (
        <div className="p-4">
          <button
            className="w-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white py-3 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              navigate('/stake/withdrawal/confirming', {
                state: {
                  stakeDetails: {
                    name: "Validator Name",
                    amount: stakeDetails.activeStake,
                    icon: stakeDetails.icon || "",
                    rentReserve: stakeDetails.rentReserve,
                    lastReward: stakeDetails.lastReward
                  }
                }
              });
            }}
          >
            Withdraw
          </button>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 max-w-[400px]">
          <div className="bg-white/10 backdrop-blur-3xl border border-white/30 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <p className="text-lg mb-6 text-white text-center">Are you sure to unstake?</p>
            <div className="flex gap-4 w-full">
              <Link to='/stake' className='w-full'>
                <button
                  className="flex-1 py-3 px-6 w-full rounded-full border border-white/20 text-white"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </Link>
              <Link to='/stake' className='w-full'>
                <button
                  className="flex-1 py-3 px-6 w-full rounded-full bg-system-danger text-white"
                  onClick={handleConfirmUnstake}
                >
                  Unstake
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 