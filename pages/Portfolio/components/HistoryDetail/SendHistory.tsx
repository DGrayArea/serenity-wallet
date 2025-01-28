import SendIcon from "@/assets/arrow-up.svg";
import Fail from "@/assets/fail-ciecle.svg";
import BackHeader from "@/components/BackHeader";
import backgroundSvg from "@/assets/background.svg";

export default function SendHistory() {
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Send" className="sticky top-0 z-50" />
      <div className="bg-[#171121] p-4 rounded-lg space-y-4 shadow-md mt-3 mx-3 border border-[#8884FF]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-[rgba(255,66,49,0.24)] text-white rounded-full w-8 h-8">
              <img src={SendIcon} alt="Receive Icon" className="w-5 h-5" />
            </div>
            <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
              Send
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div
            className="text-[#D4CAFF] text-[16px] font-light leading-normal tracking-[0.64px] pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            From
          </div>

          <div className="text-white  text-[13.33px] font-light leading-normal tracking-[0.64px] mt-3">
            Andrew’s Wallet (wh38dj...343hs)
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
            <div className="text-[#FF3737] text-[16px] font-light mt-2">
              <div> - 15 SOL</div>
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
              <div className="bg-[rgba(255,66,49,0.24)] text-[#FF4231] px-3 py-1 rounded-md font-light text-[11.11px] tracking-[0.444px] inline-flex items-center space-x-2 mt-2">
                <img src={Fail} alt="Success Icon" className="w-4 h-4" />
                <span>Failed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
