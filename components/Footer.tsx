import React from "react";
import { Link, useLocation } from "react-router-dom";
import Home from "./../assets/HomeIcon.svg";
import Collectible from "./../assets/CollectibleIcon.svg";
import Portfolio from "./../assets/PortfolioIcon.svg";
import Explore from "./../assets/ExploreIcon.svg";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
   <footer className={`w-full bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-10 border-t border-[#947EAE] mt-5 ${className || ''}`}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between">
        <Link
          to="/home"
          className={`flex flex-col justify-center items-center ${
            isActive("/home") ? "text-white" : "text-white opacity-60"
          }`}
        >
          <img src={Home} alt="Home" className="h-7" />
          Home
        </Link>
        <Link
          to="/collectibles"
          className={`flex flex-col justify-center items-center ${
            isActive("/collectibles") ? "text-white" : "text-white opacity-60"
          }`}
        >
          <img src={Collectible} alt="Collectible" className="h-7" />
          Collectibles
        </Link>
        <Link
          to="/portfolio"
          className={`flex flex-col justify-center items-center ${
            isActive("/portfolio") ? "text-white" : "text-white opacity-60"
          }`}
        >
          <img src={Portfolio} alt="Portfolio" className="h-7" />
          Portfolio
        </Link>
        <Link
          to="/explore"
          className={`flex flex-col justify-center items-center ${
            isActive("/explore") ? "text-white" : "text-white opacity-60"
          }`}
        >
          <img src={Explore} alt="Explore" className="h-7" />
          Explore
        </Link>
      </div>
    </footer>
  );
};

export default Footer;