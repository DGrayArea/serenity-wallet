
import BuyIcon from "@/assets/ArrowDown.svg";
import Success from "@/assets/SuccessCircle.svg";
 
export default function BuyCard() {
  return (
    <div className="bg-[#251C37] p-4 rounded-lg space-y-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center bg-[rgba(147,255,80,0.24)] text-white rounded-full w-8 h-8">
            <img src={BuyIcon} alt="Receive Icon" className="w-5 h-5" />
          </div>
          <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
            Buy
          </div>
        </div>
    
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-sm text-[#D4CAFF]">
        <div className="flex flex-col">
          <div
            className="text-[#D4CAFF] text-[16px] font-light leading-normal tracking-[0.64px] pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            Name
          </div>

          <div className="text-white  text-[13.33px] font-light leading-normal tracking-[0.64px] mt-3">
            GETYOURWIFF
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div
            className="text-[#D4CAFF] text-[16px] font-light leading-normal tracking-[0.64px] pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            Amount
          </div>
          <div className="text-white text-[16px] font-light mt-2">
            <div>15 SOL</div>
            <div> $102</div>
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className="text-[#D4CAFF] text-[16px] font-light leading-normal tracking-[0.64px] pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            Date
          </div>
          <div className="text-white text-[16px] font-light mt-3">
            <div>28/05/2024</div>
            <div className="mt-3 text-[#D4CAFF]">11:34 PM</div>
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div
            className="text-[#D4CAFF] text-[16px] font-light leading-normal tracking-[0.64px] pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            Status
          </div>
          <div className="mt-2">
            <div className="bg-[#2E4A31] text-[#93FF50] px-3 py-1 rounded-md font-light text-[11.11px] tracking-[0.444px] inline-flex items-center space-x-2 mt-2">
              <img src={Success} alt="Success Icon" className="w-4 h-4" />
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
