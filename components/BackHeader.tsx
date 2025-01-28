import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  step: number;
  title?: string;
  className?: string;
};

const BackHeader = (props: PropsType) => {
  const { step, title } = props;
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

          {step > 0 && (
            <div className="flex items-center">
              <div className="bg-white w-[80%] h-2 rounded-sm">
                <div
                  className={`bg-blue-600 h-full rounded-sm ${
                    step === 1 ? "w-1/2" : "w-full"
                  }`}
                ></div>
              </div>
              <p className="text-white ml-2">{step}/2</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default BackHeader;
