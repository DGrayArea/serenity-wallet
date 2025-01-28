import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import UKFlagIcon from "@/assets/ukflag.svg";

export default function DisplayLanguage() {
  const languageList = [
    { language: "English", icon: UKFlagIcon, isActive: "Active" },
  ];
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader
        step={0}
        title="Display Language"
        className="sticky top-0 z-50"
      />
      <div className="flex flex-col items-center w-full p-4 flex-1">
        <div className="w-full max-w-md space-y-4">
          {languageList.map((item, index) => (
            <div
              key={index}
              className="bg-[#171121] text-white rounded-lg cursor-pointer border-[1px] border-[#8884FF] flex justify-between items-center p-4"
            >
              <div className="flex items-center space-x-4">
                <img src={item.icon} alt="icon" />
                <span className="font-medium">{item.language}</span>
              </div>

              <div>
                <span className="text-[#FFFFFF64] ">{item.isActive}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
