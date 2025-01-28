import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import AuraIcon from "@/assets/image2.png";

export default function AppPage() {
  const title = "aura.dex";

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title={title} />
      <div className="m-4">
        <div className="flex items-center gap-4">
          <img src={AuraIcon} alt="aura icon" />
          <span className="text-white text-[25px] font-bold">
            AURA <br /> Aggregator
          </span>
        </div>
        <div className="w-full max-w-md space-y-4 mt-8">
          <div className="bg-[#171121] text-white rounded-lg cursor-pointer border-[1px] border-[#8884FF] flex-col  items-center p-3">
            <div className="flex items-center space-x-4">
              <span className="text-[14px] text-[#8884FF]">App Info</span>
            </div>
            <div className="flex justify-between space-x-4 mt-2">
              <span className="text-[#FFFFFF80] ">Last Used</span>
              <span className="text-[#FFFFFF] ">23 Nov 2023, 3.33 AM</span>
            </div>
            <div className="flex justify-between space-x-4 ">
              <span className="text-[#FFFFFF80] ">URL</span>
              <span className="text-[#FFFFFF] ">aura.dex</span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md space-y-4 mt-8">
          <div className="bg-[#171121] text-white rounded-lg cursor-pointer border-[1px] border-[#8884FF] flex-col items-center p-4">
            <div className="flex items-center space-x-4">
              <span className="text-[14px] text-[#8884FF]">Auto-Confirm</span>
            </div>
            <div className="flex justify-between space-x-4 mt-2">
              <span className="text-[#FFFFFF] font-medium ">Active</span>
            </div>
            <div className="flex-col space-x-4 text-[14px] mt-4">
              <span className="text-[#FFFFFF80] ">
                While active, Serenity will confirm all requests from this app
                without notifying you or asking for your confirmation.
              </span>
              <span className="text-[#FFFFFF80] ">
                Enabling it may put your funds at risks of fraud. Only use this
                feature with the app you trust.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
