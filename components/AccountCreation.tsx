import backgroundSvg from '../assets/background.svg';
import logo from '../assets/logo.svg';
import { Button } from './ui/button';

export default function AccountCreation() {
  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <img src={logo} className="h-[150px] mb-8" alt="Logo" />
      <div className="text-frame">
        <p className="tagline">Your gateway to an elavated<br /> Crypto Currency </p>
      </div>
      <div className="bottom-buttons">
        <Button>Create a New Wallet</Button>
        <Button variant={"ghost"}>Import Existing Wallet</Button>
      </div>
    </div>
  )
}