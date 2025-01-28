import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DotMenuIcon from "@/assets/dotmenu.svg";

type PropsType = {
  title?: string;
  onClick: () => void;
  className?: string;
};

const BackHeaderMenu = (props: PropsType) => {
  const { onClick, title } = props;
  const navigate = useNavigate();

  return (
    <header className={`w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-10 ${props.className || ''}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center h-12">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-gray-200 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
          >
            <ChevronLeft size={24} />
          </button>
          {title && (
            <h1 className="text-white text-[13.33px] font-light leading-normal tracking-[0.533px] ml-4 flex-1">
              {title}
            </h1>
          )}

          <img src={DotMenuIcon} alt="menu" onClick={onClick} />
        </div>
      </div>
    </header>
  );
};

export default BackHeaderMenu;
