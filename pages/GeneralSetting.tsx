import { useState } from "react";
import backgroundSvg from "../assets/background.svg";

import Navbar from "@/components/Navbar";
import HeaderAddressBook from "@/components/ui/HeaderAddressBook";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GeneralSetting() {
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
  };
  const navigate = useNavigate();

  const settingList = [
    { title: "Display Language", path: "/display-language" },
    { title: "Connected Apps", path: "/connected-app" },
    { title: "Preferred Explorer", path: "/preferred-explorer" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <HeaderAddressBook
        MenuClick={handleMenuClick}
        headerFor="GeneralSetting"
        className="sticky top-0 z-50"
      />
      <div className="flex flex-col items-center w-full p-4 flex-1 overflow-auto scrollbar-none">
        <div className="w-full max-w-md space-y-4">
          {settingList.map((item, index) => (
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