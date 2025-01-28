import backgroundSvg from '../assets/background.svg';

interface SwapSubmittingModalProps {
  payAmount: number;
  paySymbol: string;
  receiveAmount: number;
  receiveSymbol: string;
}

export default function SwapSubmittingModal({ 
  payAmount, 
  paySymbol, 
  receiveAmount, 
  receiveSymbol 
}: SwapSubmittingModalProps) {
  return (
    <div 
      className="min-h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ 
        backgroundImage: `url(${backgroundSvg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-col items-center justify-center p-6 w-full max-w-sm mx-auto">
        {/* Loading Animation - 3 dots */}
        <div className="flex space-x-2 mb-6">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.5s]"></div>
        </div>

        <h1 className="text-xl font-semibold text-white mb-3 text-center">
          Submitting Transaction
        </h1>
        
        <p className="text-white/70 text-center text-sm">
          Swapping {payAmount} {paySymbol} to {receiveAmount} {receiveSymbol}
        </p>
      </div>
    </div>
  );
} 