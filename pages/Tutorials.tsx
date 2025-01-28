import { useState } from "react";
import backgroundSvg from "../assets/background.svg";
import tutorial from "../assets/Group.png";
import BackHeader from "@/components/BackHeader";
import Navbar from "@/components/Navbar";
import Search from "@/components/ui/search";
import Dropdown from "@/components/ui/dropdown-button";

const tutorialData = [
  { title: "Features Overview", content: "Explore all the features we offer." },
  {
    title: "Advanced Settings",
    content:
      "Dive into advanced settings to fully customize your experience. This includes detailed steps and screenshots to help you configure your account exactly how you want.",
  },
  {
    title: "Troubleshooting",
    content:
      "Find solutions to common issues. If you're having trouble, check out our troubleshooting guide for detailed answers to frequently asked questions.",
  },
];

export default function Tutorials() {
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
    console.log(menu);
  };

  const handleToggle = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="Tutorial & Guide" className="sticky top-0 z-50"/>
      <div className="me-5">
        <div className="w-full bg-[#102A34] py-2 flex items-center justify-between ps-8 pe-4">
          <h1 className="text-white text-[27.65px] font-normal leading-normal tracking-[1.659px] mt-[-70px]">
            Crypto 101
          </h1>

          <img
            src={tutorial}
            alt="Tutorial Icon"
            className="w-[140px] h-[140px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full p-4 flex-1">
        <Search placeholder="Search Tutorials..." />
        <div className="w-full max-w-md mt-6">
          {tutorialData.map(({ title, content }) => (
            <Dropdown
              key={title}
              title={title}
              isOpen={openDropdown === title}
              onToggle={() => handleToggle(title)}
            >
              {content}
            </Dropdown>
          ))}
        </div>
      </div>

      <Navbar className={stateMenu} stateMenu={handleMenuClick} />
    </div>
  );
}
