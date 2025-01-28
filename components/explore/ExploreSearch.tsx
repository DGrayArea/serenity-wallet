import { ChevronLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreSearch = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364] flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Back Button */}
          <button 
          onClick={() => navigate(-1)}
          className="text-white/80 w-6 h-6"
        >
           <ChevronLeft className="w-6 h-6" />
          </button>

           {/* Search Bar */}
          <div className="relative w-full">
            <input 
              type="text"
            className="w-full bg-[#ffffff0d] text-white rounded-full py-2.5 px-4 
                     border border-[#ffffff26] focus:outline-none
                     placeholder:text-[#ffffff80] text-sm"
            placeholder="Search or type a URL" 
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
        </div>
        </div>

    <div className="flex flex-col gap-6 mt-6">
       
        <button className="w-full bg-neutral-800 border border-main-300 rounded-2xl py-5 flex items-center gap-3 px-4">
          <Search className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Search with Google</span>
          </button>
   

        {/* Assets Section */}
        <div className="">
                 {/* Google Search Button */}
          <h2 className="text-white text-base mb-3 font-medium">Assets</h2>
          <div className="bg-neutral-800 border border-main-300 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#00A478] rounded-full flex items-center justify-center">
                  <span className="text-white">$</span>
                </div>
                <div>
                  <div className="text-white font-light">USDT</div>
                  <div className="text-xs text-main-100">USDT</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-sm">1,841,7.98</div>
                <div className="text-[#FF4D4D] text-xs">-0.56%</div>
              </div>
            </div>
          </div>
          <button className="text-white font-semibold text-xs mt-2">See all results</button>
        </div>

        {/* NFTs Section */}
        <div className="">
          <h2 className="text-white text-base mb-3 font-medium">NFTs</h2>
          <div className="bg-neutral-800 border border-main-300 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#7A3EF8] rounded-full overflow-hidden">
                  {/* Add NFT image here if needed */}
                </div>
                <div>
                  <div className="text-white font-light">Bythenroom</div>
                  <div className="text-xs text-main-100">12 items</div>
                </div>
              </div>
              <div className="text-white text-sm">17 ETH</div>
            </div>
          </div>
          <button className="text-white font-semibold text-xs mt-2">See all results</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExploreSearch;
