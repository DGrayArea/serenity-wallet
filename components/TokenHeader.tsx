import { ChevronLeft, StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type PropsType = {
  token?: string
}

const TokenHeader = (props: PropsType) => {
  const token = props.token;
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="w-full flex items-center h-12 text-white">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full text-gray-200 hover:bg-white hover:bg-opacity-10 transition-colors duration-200 mr-1"
          >
            <ChevronLeft size={24} />
          </button>
          {token}
        </div>
        <StarIcon className="text-white" />
      </div>
    </header>
  );
};

export default TokenHeader;
