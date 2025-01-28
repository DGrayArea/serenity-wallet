import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.svg';

type PropsType = {
  success: boolean,
  content: string
}

const ImportHeader = (props: PropsType) => {
  const success = props.success;
  const content = props.content;
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center h-12">
          {
            success ?
              <img src={logo} className="h-[20px] mt-24" alt="Logo" />
              : <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full text-gray-200 hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
              >
                <ChevronLeft size={24} />
              </button>
          }

          <p className="ml-6 text-white">{content}</p>
        </div>
      </div>
    </header>
  );
};

export default ImportHeader;
