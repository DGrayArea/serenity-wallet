import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import backgroundSvg from "../assets/background.svg";
import AuraDexImage from "@/assets/image 1.png";
import DangerIcon from "@/assets/danger.svg";
import StarIcon from "@/assets/star.svg";

import BackHeaderMenu from "@/components/BackHeaderMenu";
import DisconnectDialog from "@/components/DisconnectDialog";

interface ConnectedAppItem {
  app: string;
  icon: string;
  isActive: string;
}

const ConnectedApp: React.FC = () => {
  const navigate = useNavigate();

  const appList: ConnectedAppItem[] = [
    { app: "aura.dex", icon: AuraDexImage, isActive: "Active" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showDisconnectDialog, setShowDisconnectDialog] =
    useState<boolean>(false);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleDisconnectAll = () => {
    setShowDisconnectDialog(true);
  };

  const handleCloseDialogs = () => {
    setShowDisconnectDialog(false);
    setIsMenuOpen(false);
  };

  const handleNavigateToAppPage = () => {
    navigate("/app-page");
  };

  return (
    <div
      className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col relative overflow-auto scrollbar-none"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <BackHeaderMenu
        onClick={handleMenuToggle}
        title="Connected App"
        className="sticky top-0 z-50"
      />

      <div className="relative flex flex-col items-center w-full p-4 flex-1">
        <div className="w-full max-w-md space-y-4">
          {appList.length > 0 ? (
            appList.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={handleNavigateToAppPage}
                className="bg-[#171121] text-white rounded-lg border border-[#8884FF] flex justify-between items-center w-full p-4 hover:bg-[#2B2237]"
                aria-label={`Open details for ${item.app}`}
              >
                <div className="flex items-center space-x-4">
                  <img src={item.icon} alt={`${item.app} icon`} />
                  <span className="font-medium">{item.app}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white text-[20px] font-semibold text-center">
                No connected apps
              </p>
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="absolute inset-0 bg-[#00000080] flex justify-center items-end">
            <div className="flex flex-col text-[#FF423190] bg-[#FFFFFF10] p-4 w-full max-w-md mb-4 rounded-lg">
              <button
                type="button"
                onClick={handleDisconnectAll}
                className="flex items-center w-full border-2 border-[#FF423190] h-12 rounded-lg text-start p-2 gap-2 hover:bg-[#FFFFFF20]"
                aria-label="Disconnect all apps"
              >
                <img src={DangerIcon} alt="Disconnect icon" />
                <span>Disconnect from all</span>
              </button>

              <button
                type="button"
                onClick={handleMenuToggle}
                className="flex items-center w-full border-2 border-[#FF423190] h-12 mt-4 rounded-lg text-start p-2 gap-2 hover:bg-[#FFFFFF20]"
                aria-label="End auto-confirm for all apps"
              >
                <img src={StarIcon} alt="End auto-confirm icon" />
                <span>End auto-confirm for all</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <DisconnectDialog
        isOpen={showDisconnectDialog}
        title="Are you sure you want to disconnect all apps from Serenity Wallet?"
        onClose={handleCloseDialogs}
      />
    </div>
  );
};

export default ConnectedApp;
