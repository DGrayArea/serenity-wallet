import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ChevronRight } from "lucide-react";

export default function Info() {
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const infoList = [
    { title: "AML Policy", path: "/aml-policy" },
    { title: "Whitepaper", path: "/whitepaper" },
    { title: "Terms & Conditions", path: "/terms-conditions" },
    { title: "Privacy & Policy", path: "/privacy-policy" },
    { title: "Legal", path: "/legal" },
  ];

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header MenuClick={handleMenuClick} />
      <div className="flex flex-col items-center w-full p-4 flex-1">
        <div className="w-full max-w-md space-y-4">
          {infoList.map((item, index) => (
            <div
              key={index}
              className="bg-[#171121] text-white rounded-lg cursor-pointer border-[1px] border-[#8884FF] flex justify-between items-center p-4"
              onClick={() => handleNavigation(item.path)}
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium">{item.title}</span>
              </div>

              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      <Navbar className={stateMenu} stateMenu={handleMenuClick} />
    </div>
  );
}
