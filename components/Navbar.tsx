import { Link } from "react-router-dom";
import Logo from "./../assets/logo.svg";
import Home from "./../assets/HomeIcon.svg";
import Manage from "./../assets/ManageIcon.svg";
import Address from "./../assets/AddressIcon.svg";
import Setting from "./../assets/SettingIcon.svg";
import Security from "./../assets/SecurityIcon.svg";
import Support from "./../assets/SupportIcon.svg";
import Info from "./../assets/InfoIcon.svg";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
// import ManageWalletModal from './ManageWalletModal';

type PropsType = {
  className?: string;
  stateMenu: (arg: string) => void;
  manageWallet?: (arg: boolean) => void;
};

const MENU_ITEMS = [
  { name: "Home", icon: Home, path: "/home" },
  { name: "Manage Wallet", icon: Manage, path: "/manage-wallet" },
  { name: "Address Book", icon: Address, path: "/address-book" },
  { name: "General Setting", icon: Setting, path: "/settings" },
  { name: "Security", icon: Security, path: "/security" },
  { name: "Help & Support", icon: Support, path: "/help-support" },
  { name: "Info", icon: Info, path: "/info" },
];

const Navbar = (props: PropsType) => {
  const className = props.className;

  return (
    <div className={cn("w-72 h-[600px] bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-50 fixed left-0 top-0", className)}>
      <div className='h-16 flex justify-between px-4 border-b border-[#947EAE] items-center mb-6'>
        <img src={Logo} alt='Logo' className='h-8' />
        <XIcon className='text-white text-2xl cursor-pointer' onClick={() => props.stateMenu('hidden')} />
      </div>
      {MENU_ITEMS.map((item) => {
        return item.name !== "Manage Wallet" ?
          <Link
            key={item.name}
            to={item.path}
            className='hover:bg-[#573CFA] w-full px-4 py-3 text-white flex items-center'
          >
            <img src={item.icon} alt={item.name} className='h-5 w-5 mr-2' /> {item.name}
          </Link> :
          <div
            key={item.name}
            className='hover:bg-[#573CFA] w-full px-4 py-3 text-white flex items-center cursor-pointer'
            onClick={() => props.manageWallet(true)}
          >
            <img src={item.icon} alt={item.name} className='h-5 w-5 mr-2' /> {item.name}
          </div>
      }
      )}
      <div className='px-4 mt-12 text-white'>
        <p>Serenity</p>
        <p>version 1.0</p>
      </div>
    </div>
  );
};

export default Navbar;
