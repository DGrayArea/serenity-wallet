import Menu from "@/assets/Menu.svg";
import GraphyIcon from "@/assets/graphy.svg";
import { useNavigate } from "react-router-dom";

interface HeadeerProps {
  MenuClick: (arg: string) => void;
  headerFor?: string;
  className?: string;
}
export default function HeaderAddressBook({
  MenuClick,
  headerFor,
  className,
}: HeadeerProps) {
  const navigate = useNavigate();
  const handleClickMenu = () => {
    MenuClick("");
  };
  const handelNavigate = () => {
    navigate("/add-address");
  };

  if (headerFor == "AddressBook") {
    return (
      <header className={`w-full bg-white bg-opacity-30 z-10 ${className || ''}`}>
        <div className="flex items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img
              src={Menu}
              alt="menu"
              className="h-6 w-6 cursor-pointer"
              onClick={handleClickMenu}
            />
          </div>
          <div className="ml-2">
            <h1 className="text-[#FFFFFF90] text-[20px] pb-1">Address Book</h1>
          </div>
          <div className="ml-auto">
            <img
              src={GraphyIcon}
              alt="menu"
              className="h-6 w-6 cursor-pointer"
              onClick={handelNavigate}
            />
          </div>
        </div>
      </header>
    );
  }

  if (headerFor == "GeneralSetting") {
    return (
      <header className="w-full bg-white bg-opacity-30 z-10">
        <div className="flex items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <img
              src={Menu}
              alt="menu"
              className="h-6 w-6 cursor-pointer"
              onClick={handleClickMenu}
            />
          </div>
          <div className="ml-2">
            <h1 className="text-[#FFFFFF90] text-[20px] pb-1">
              General Setting
            </h1>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white bg-opacity-30 z-10">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <img
            src={Menu}
            alt="menu"
            className="h-6 w-6 cursor-pointer"
            onClick={handleClickMenu}
          />
        </div>
      </div>
    </header>
  );
}
