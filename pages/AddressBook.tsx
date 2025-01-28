import { useEffect, useState } from "react";
import backgroundSvg from "../assets/background.svg";
import Navbar from "@/components/Navbar";
import HeaderAddressBook from "@/components/ui/HeaderAddressBook";
import WalletIcon from "@/assets/wallet.svg";
import GraphyIcon from "@/assets/graphy.svg";
import { useNavigate } from "react-router-dom";

export interface Wallet {
  name: string;
  address: string;
}

export default function AddressBook() {
  const [stateMenu, setStateMenu] = useState<string>("hidden");
  const handleMenuClick = (menu: string) => {
    setStateMenu(menu);
  };

  const navigate = useNavigate();

  const [walletList, setWalletList] = useState<Wallet[]>([]);

  const sampleWallets: Wallet[] = [
    {
      name: "My Primary Wallet",
      address: "0x1234567890abcdef1234567890abcdef12345678",
    },
    {
      name: "Savings Wallet",
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
    },
    {
      name: "Business Wallet",
      address: "0x9876543210abcdef9876543210abcdef98765432",
    },
  ];
  //   const handelAddWallet = () => {};
  useEffect(() => {
    setWalletList(sampleWallets);
  }, []);

  const handelNavigate = () => {
    navigate("/add-address");
  };

  const navigateToEdit = () => {
    navigate("/edit-address");
  };

  console.log("walletList", walletList);
  console.log("walletList", walletList.length);
  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <HeaderAddressBook
        MenuClick={handleMenuClick}
        headerFor="AddressBook"
        className="sticky top-0 z-50"
      />
      <div className="flex flex-col items-center w-full p-4 flex-1">
        <div className="w-full max-w-md space-y-4">
          {walletList.map((item, index) => (
            <div
              key={index}
              className="bg-[#171121] text-white rounded-lg cursor-pointer border-[1px] border-[#8884FF] flex justify-between items-center p-3"
              onClick={() => navigateToEdit()}
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                  <img src={WalletIcon} alt="wallet" />
                </div>

                <span className="font-medium">{item.name}</span>
              </div>
              <div className="ml-auto w-24 overflow-hidden whitespace-nowrap truncate">
                <span className="font-medium text-[14px] text-[#D4CAFF] ">
                  {item.address}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {walletList.length === 0 ? (
        <div className="w-full h-full">
          <div className="flex h-full items-center justify-center">
            <div className="">
              <div className="flex justify-center">
                <p className="text-[#FFFFFF] text-[20px] font-semibold">
                  Your address book <br />
                  is currently empty
                </p>
              </div>

              <div className="flex gap-2 mt-4 border-[1px] border-b-[#FFFFFF30] border-r-[#FFFFFF80]  p-2 pl-4 pr-4 rounded-full bg-[#FFFFFF10]">
                <button className="text-[#FFFFFF] font-semibold">
                  Add New Address
                </button>
                <img
                  src={GraphyIcon}
                  alt="menu"
                  className="h-6 w-6 cursor-pointer"
                  onClick={handelNavigate}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/**/}
      <Navbar className={stateMenu} stateMenu={handleMenuClick} />
    </div>
  );
}
