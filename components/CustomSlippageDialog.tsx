import { CircleX } from 'lucide-react';
import { useState } from 'react';

interface CustomSlippageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (value: number) => void;
  initialValue: number;
  highSlippage: boolean;
  lowSlippage: boolean;
}

export default function CustomSlippageDialog({
  isOpen,
  onClose,
  onApply,
  initialValue,
  highSlippage,
  lowSlippage
}: CustomSlippageDialogProps) {
  const [customSlippage, setCustomSlippage] = useState(initialValue);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#171121] rounded-2xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-white text-xl mb-6">Slippage Tolerance</h2>
        
        <div className="flex gap-2 border-2 border-main-300 rounded-lg p-1 mb-6">
          {[0.1, 0.3, 0.5, 1.0].map((value) => (
            <button
              key={value}
              onClick={() => setCustomSlippage(value)}
              className={`flex-1 rounded-lg py-2 text-sm ${
                customSlippage === value
                  ? 'bg-indigo-600 text-white'
                  : 'text-white/70'
              }`}
            >
              {value}%
            </button>
          ))}
        </div>

        <div className="mb-6">
          <p className="text-white text-sm mb-2">Custom Slippage</p>
          <div className={`flex items-center justify-between bg-[#2C243B] border ${
            highSlippage || lowSlippage ? 'border-system-danger' : 'border-white/40'
          } rounded-lg px-4 py-3`}>
            <input
              type="number"
              placeholder="0.0"
              value={customSlippage || ''}
              onChange={(e) => setCustomSlippage(Number(e.target.value))}
              className="bg-transparent text-white w-full outline-none"
            />
            <span className="text-white ml-2">%</span>
          </div>
        </div>

        {highSlippage && (
          <div className="text-[#FF4231] text-xs mb-4 flex items-center">
            <CircleX className="w-4 h-4 mr-2" />
            Your transaction may be frontrun and result in an unfavorable trade
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(customSlippage);
              onClose();
            }}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-white"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
} 