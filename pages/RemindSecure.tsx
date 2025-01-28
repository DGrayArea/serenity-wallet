/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import backgroundSvg from '../assets/background.svg';
import secure from '../assets/Secure.svg';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

const RemindSecure: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (state: CheckedState) => {
    setChecked(Boolean(state.valueOf()));
    if (state.valueOf()) setIsLoading(true);
    else setIsLoading(false);
  }

  const handleConfirm = () => {
    setIsLoading(false);
    setChecked(true);
  }

  const handleSecure = async () => {
    try {
      // The seed phrase is already stored during creation, so we just need to navigate
      navigate('/secure/wallet');
    } catch (error: any) {
      console.error('Error confirming seed phrase:', error);
    }
  };

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      {
        isLoading ?
          <div className='w-full flex flex-col justify-between flex-1'>
            <div className='w-full flex flex-col justify-start items-center mt-24 text-center'>
              <h1 className='text-2xl text-white font-bold font-sans tracking-widest text-center'>Secure Your Wallet</h1>
              <p className='text-white opacity-70 text-center'>Secure your wallet's seed phrase</p>
            </div>
            <div className={"w-full h-full backdrop-blur-sm backdrop-brightness-[0.9] backdrop-contrast-75 border boder-solid border-gray-400 rounded-tr-xl rounded-tl-xl mt-2 px-6 py-4 text-center flex flex-col justify-between"}>
              <h1 className='text-2xl text-white font-bold font-sans tracking-widest mt-4'>What is a 'Seed Phrase'</h1>
              <p className='text-left mt-4 text-white text-lg'>A seed phrase is a set of twelve words that contains all the information about your wallet, including your funds. It's like a secret code used to access your entire wallet.</p>
              <p className='text-left mt-4 text-white text-lg'>You must keep your seed phrase secret and safe. If someone gets your seed phrase, they'll gain contral over your accounts.</p>
              <p className='text-left text-white text-lg'>Save it in a place where only you can access it.<span className='text-left text-red-600 text-lg'>&nbsp;If you lose it, not even Serenity can help you recover it.</span></p>
              <div className='w-full flex items-center justify-center'>
                <Button className='w-[90%] h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleConfirm}>I Got It</Button>
              </div>
            </div>
          </div> :
          <div className="w-full flex flex-col justify-between flex-1">
            <div className='w-full flex flex-col justify-start items-center mt-32 text-center'>
              <img src={secure} className="h-[180px]" alt="secure" />
              <h1 className='text-4xl text-white font-bold font-sans tracking-widest mt-2'>Secure<br />Your Wallet</h1>
            </div>
            <div className={"w-full h-full backdrop-blur-sm backdrop-brightness-[0.9] backdrop-contrast-75 border boder-solid border-gray-400 rounded-tr-xl rounded-tl-xl mt-2 px-6 py-4 text-center flex flex-col justify-between"}>
              <h1 className='text-2xl text-white font-bold font-sans tracking-widest mt-4'>Skip Account Security?</h1>
              <div className='flex text-left'>
                <Checkbox className='mt-[0.4rem]' onCheckedChange={handleChange} checked={checked} /> <p className='ml-2 text-white cursor-pointer' onClick={() => handleChange(!checked)}>I understand that if I lose my seed phrase I will not be able to acces my wallet forever.</p>
              </div>
              <div className='w-full flex items-center justify-between'>
                <Button className='w-[48%] h-[50px] rounded-full bg-gradient-to-r from-[#FFFFFF]-0 to-[#FFFFFF] text-[17px]-100 text-white border border-solid border-white' onClick={() => navigate('/home', { state: { isWatch: false } })}>Skip</Button>
                <Button className='w-[48%] h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleSecure}>Secure Now</Button>
              </div>

            </div>
          </div>
      }
    </div>
  );
};

export default RemindSecure;