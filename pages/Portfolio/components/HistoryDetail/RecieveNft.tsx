import RecieveImage from "@/assets/Images/Recieve-image.jpg";
import RecieveIcon from "@/assets/Recieve.svg";
import Success from "@/assets/SuccessCircle.svg";
import BackHeader from "@/components/BackHeader";
import backgroundSvg from "@/assets/background.svg";

export default function RecieveNft() {
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Recieve" className="sticky top-0 z-50"/>
      <div className="bg-[#171121] p-4 rounded-lg space-y-4 shadow-md mt-3 mx-3 border border-[#8884FF]">
        <div className="flex flex-col space-y-4">
          {/* Receive Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center bg-[rgba(232,198,23,0.24)] text-white rounded-full w-8 h-8">
              <img src={RecieveIcon} alt="Receive Icon" className="w-5 h-5" />
            </div>
            <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
              Receive
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={RecieveImage}
              alt="Profile"
              className="w-[115px] h-[80px] rounded-lg object-cover"
            />
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
      {/* description */}
      <div className="bg-[#171121] p-4 rounded-lg space-y-4 shadow-md mt-3 mx-3 border border-[#8884FF]">
        <div
          className="flex flex-col space-y-4 pb-2"
          style={{
            borderBottom: "0.5px solid #5F4D79",
          }}
        >
          <div className="flex items-center space-x-2 ">
            <div className="text-[#D4CAFF] text-[13.33px] font-light leading-normal tracking-[0.64px]">
              Description
            </div>
          </div>
          <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
            Abstract Painting
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-sm text-[#D4CAFF]">
          <div
            className="flex flex-col pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            <div className="text-[#D4CAFF]  text-[13.33px] font-light leading-normal tracking-[0.64px] ">
              Collection
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div
              className="text-white text-[16px] font-light pb-2"
              style={{
                borderBottom: "0.5px solid #5F4D79",
              }}
            >
              <div>Get your Wiff</div>
            </div>
          </div>

          <div
            className="flex flex-col pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            <div className="text-[#D4CAFF]  text-[13.33px] font-light leading-normal tracking-[0.64px] ">
              Floor Price
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div
              className="text-white text-[16px] font-light pb-2"
              style={{
                borderBottom: "0.5px solid #5F4D79",
              }}
            >
              <div>0.00023 SOL</div>
            </div>
          </div>

          <div
            className="flex flex-col pb-2"
            style={{
              borderBottom: "0.5px solid #5F4D79",
            }}
          >
            <div className="text-[#D4CAFF]  text-[13.33px] font-light leading-normal tracking-[0.64px] ">
              Unique Holders
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div
              className="text-white text-[16px] font-light  pb-2"
              style={{
                borderBottom: "0.5px solid #5F4D79",
              }}
            >
              <div>206,054</div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[#D4CAFF]  text-[13.33px] font-light leading-normal tracking-[0.64px]">
              Network
            </div>
          </div>
          <div className="flex flex-col text-right">
            <div className="text-white text-[16px] font-light  ">
              <div>Solana</div>
            </div>
          </div>
        </div>
      </div>
      {/* Properties Section */}
      <div className=" p-4 rounded-lg space-y-4  mt-3 mx-1">
        <div className="text-[#D4CAFF] text-[16px] font-light leading-normal tracking-[0.64px] ">
          Properties
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="bg-[rgba(87,60,250,0.24)] px-3 py-2 rounded-md border border-[#8884FF]">
            <div className="text-[#D4CAFF] text-[13.33px] font-light leading-normal tracking-[0.64px]">
              Website
            </div>
            <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
              https:5000wif.com
            </div>
          </div>
          <div className="bg-[rgba(87,60,250,0.24)] px-3 py-2 rounded-md border border-[#8884FF]">
            <div className="text-[#D4CAFF] text-[13.33px] font-light leading-normal tracking-[0.64px]">
              Verified
            </div>
            <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
              True
            </div>
          </div>
          <div className="bg-[rgba(87,60,250,0.24)] px-3 py-2 rounded-md border border-[#8884FF]">
            <div className="text-[#D4CAFF] text-[13.33px] font-light leading-normal tracking-[0.64px]">
              Amount
            </div>
            <div className="text-white text-[16px] font-light leading-normal tracking-[0.64px]">
              5,000 WIF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
