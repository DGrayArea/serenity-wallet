import Share from "@/assets/share.svg";
import InfoIcon from "@/assets/InfoIcon.svg";
import EyeIcon from "@/assets/EyeIcon.svg";
import CircleIcon from "@/assets/Group.png";

// Reusable InfoIcon Component
const InfoIconWithText = ({
  text,
  value,
  marginLeft,
}: {
  text: string;
  value: string;
  marginLeft?: string;
}) => (
  <div>
    <p className="text-sm text-[#ABA8FF]">
      {text}
      <span className="ml-2 text-sm text-gray-500 cursor-pointer">
        <img src={InfoIcon} alt="Info" className="w-4 h-4 inline-block" />
      </span>
    </p>
    <p className={`text-lg font-bold ${marginLeft} mt-2`}>{value}</p>
  </div>
);

export default function PortfolioCard() {
  return (
    <div className="relative bg-[#00151F] shadow-lg p-8 w-full mx-0 border-b-2 border-[#298D82] bg-no-repeat">
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${CircleIcon})`,
          backgroundSize: "150px 150px",
          backgroundPosition: "right center",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      <h2 className="text-[13.33px] font-semibold text-[#ABA8FF]">
        Estimated Asset Value
        <span className="ml-2 cursor-pointer">
          <img src={InfoIcon} alt="Info" className="w-4 h-4 inline-block" />
        </span>
      </h2>

      <div className="flex items-center ms-9 mt-4">
        <span className="text-3xl font-bold text-white">$</span>
        <span className="ml-2 text-3xl font-bold text-white">-</span>
        <img
          src={EyeIcon}
          alt="Eye"
          className="w-7 h-7 ms-4 mt-2 inline-block"
        />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mt-8 items-center text-white">
        <InfoIconWithText
          text="Return Value (7D)"
          value="0.0%"
          marginLeft="ms-8"
        />
        <div className="w-[2px] h-full bg-[#044140] ms-[-10px]" />
        <InfoIconWithText
          text="Return Value (30D)"
          value="0.0%"
          marginLeft="ms-10"
        />
      </div>

      <button
        className="absolute top-8 right-4 bg-[linear-gradient(270deg,_#8884FF_0%,_#573CFA_100%)] text-white p-2 rounded-full hover:opacity-90 focus:outline-none"
        title="Share"
      >
        <img src={Share} alt="Share" className="w-5 h-5" />
      </button>
    </div>
  );
}