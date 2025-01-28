import { useState } from "react";
import backgroundSvg from "../assets/background.svg";
import BackHeader from "@/components/BackHeader";
import Navbar from "@/components/Navbar";
import Search from "@/components/ui/search";
import Dropdown from "@/components/ui/dropdown-button";

const dropdownData = [
  { title: "How", content: "Content for the 'How' dropdown." },
  { title: "What", content: "Content for the 'What' dropdown." },
  { title: "When", content: "Content for the 'When' dropdown." },
  { title: "Why", content: "Content for the 'Why' dropdown." },
  {
    title: "Where",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "This is Title",
    content: "Content for the 'This is Title' dropdown.",
  },
];

export default function Support() {
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
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeader step={0} title="FAQ" className="sticky top-0 z-50" />

      <div className="flex flex-col items-center w-full p-4 flex-1">
        <Search placeholder="Search here..." />

        <div className="w-full max-w-md mt-6">
          {dropdownData.map(({ title, content }) => (
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
