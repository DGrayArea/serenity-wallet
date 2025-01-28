import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ChevronDownIcon } from "lucide-react";

export default function Support() {
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
    console.log(menu);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header MenuClick={handleMenuClick} className="sticky top-0 z-50"/>
      <div className="flex flex-col items-center w-full p-4 flex-1">
        <div className="w-full max-w-md">
          <div
            className="bg-[#171121] text-white rounded-lg mb-4 cursor-pointer border-[1px] border-[#8884FF]"
            onClick={() => handleNavigation("/faq")}
          >
            <div className="flex justify-between items-center p-4">
              <span className="font-medium">FAQ</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div
            className="bg-[#171121] text-white rounded-lg mb-4 cursor-pointer border-[1px] border-[#8884FF]"
            onClick={() => handleNavigation("/tutorials-guide")}
          >
            <div className="flex justify-between items-center p-4">
              <span className="font-medium">Tutorials & Guide</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <Navbar className={stateMenu} stateMenu={handleMenuClick} />
    </div>
  );
}
