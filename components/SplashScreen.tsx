import { LoaderCircle } from "lucide-react";
import backgroundSvg from "../assets/background.svg";
import logo from "../assets/logo.svg";

export default function SplashScreen() {
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <img src={logo} className="h-[150px] mb-8" alt="Logo" />
      <LoaderCircle
        className="animate-spin text-white"
        size={48}
        strokeWidth={0.8}
      />
    </div>
  );
}
