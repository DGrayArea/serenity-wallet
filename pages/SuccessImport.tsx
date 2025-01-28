/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import backgroundSvg from '../assets/background.svg';
import connect from '../assets/connect.svg';
import logo from '../assets/logo.svg';

const SuccessImport: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConfirm = async () => {
    try {
      // The seed phrase is already stored during creation, so we just need to navigate
      navigate('/home', { state: { isWatch: false } });
    } catch (error: any) {
      console.error('Error confirming seed phrase:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to confirm seed phrase',
      });
    }
  };

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <header className="w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg z-10">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full flex flex-col justify-center items-start h-12">
            <img src={logo} className='h-9' alt='logo' />
          </div>
        </div>
      </header>
      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4">
        <div className='w-full flex flex-col justify-start items-center mt-[20%]'>
          <img src={connect} className="h-[170px]" alt="connect" />
          <h1 className='text-2xl text-white font-bold font-sans tracking-widest mt-7'>Congratulations!</h1>
          <p className='text-white opacity-70 mt-3'>Your wallet has been connected!</p>
        </div>
        <Button className='w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleConfirm}>Great!</Button>
      </div>
    </div>
  );
};

export default SuccessImport;