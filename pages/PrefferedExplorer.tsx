import BackHeader from "@/components/BackHeader";
import backgroundSvg from "../assets/background.svg";
import SelectedIcon from "@/assets/selected.svg";

export default function PrefferedExplorer() {
  const titleList = [
    { title: "Solana Beach", isActive: false },
    { title: "Solscan", isActive: true },
    { title: "Solana Explorer", isActive: false },
    { title: "Solana FM", isActive: false },
    { title: "XRAY", isActive: false },
  ];
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Preffered Explorer" />
      <div className="flex flex-col items-center w-full p-4 flex-1">
        <div className="w-full max-w-md space-y-4">
          {titleList.map((item, index) => (
            <div
              key={index}
              className="bg-[#171121] text-white rounded-lg cursor-pointer border-[1px] border-[#8884FF] flex justify-between items-center p-4"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium">{item.title}</span>
              </div>

              <div>
                {item.isActive ? (
                  <img src={SelectedIcon} alt="SelectedIcon" />
                ) : null}
                {/* <span className="text-[#FFFFFF64] ">{item.isActive}</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
