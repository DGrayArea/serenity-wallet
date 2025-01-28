import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import backgroundSvg from "../assets/background.svg";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

type MenuVisibility = "hidden" | "";

const CHANGE_PIN_PATH = "/security/confirm-currentPIN";
const RESET_APP_PATH = "/resetApp";

function Security(): JSX.Element {
  const [menuVisibility, setMenuVisibility] =
    useState<MenuVisibility>("hidden");
  const navigate = useNavigate();

  const handleMenuToggle = useCallback((menu: string) => {
    if (menu === "hidden" || menu === "") {
      setMenuVisibility(menu);
    }
  }, []);

  const handleNavigation = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <Header
        MenuClick={handleMenuToggle}
        content="Security"
        className="sticky top-0 z-50"
      />

      <main className="flex flex-col items-center w-full p-4 flex-1">
        <section className="w-full max-w-md space-y-4">
          <button
            type="button"
            onClick={() => handleNavigation(CHANGE_PIN_PATH)}
            className="w-full bg-[#171121] text-white rounded-lg border border-[#8884FF] flex justify-between items-center p-4 hover:bg-[#2B2237] transition-colors"
            aria-label="Change your PIN"
          >
            <span className="font-medium">Change PIN</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>

          <button
            type="button"
            onClick={() => handleNavigation(RESET_APP_PATH)}
            className="w-full bg-none text-white rounded-lg border border-[#FF3737] flex justify-between items-center p-4 hover:bg-[#FF373710] transition-colors"
            aria-label="Reset the application"
          >
            <span className="font-medium text-[#FF3737]">Reset App</span>
          </button>
        </section>
      </main>

      <Navbar className={menuVisibility} stateMenu={handleMenuToggle} />
    </div>
  );
}

export default Security;
