/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import backgroundSvg from '../assets/background.svg';
import secure from '../assets/Secure.svg';
import BackHeader from '@/components/BackHeader';

const SuccessSecure: React.FC = () => {
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
      <BackHeader step={2} />
      <div className="w-full flex flex-col justify-between flex-1 py-3 px-4">
        <div className='w-full flex flex-col justify-start items-center'>
          <img src={secure} className="h-[170px]" alt="secure" />
          <h1 className='text-2xl text-white font-bold font-sans tracking-widest mt-7'>Congratulations!</h1>
          <p className='text-white opacity-70'>You've successfully protected your wallet.<br />Remember to keep your seed phrase safe, it's your responsibility!</p>
          <p className='text-white opacity-70 mt-3'>Our wallet cannot recover your wallet should you lose it. You can find your seed phrase in</p>
          <div className='w-full flex text-cyan-600'>
            <Link to={'#'}>Setting</Link>
            &nbsp;&gt;&nbsp;
            <Link to={'#'}>Security</Link>
          </div>
        </div>
        <Button className='w-[90%] m-auto h-[50px] rounded-full bg-gradient-to-r from-[#573CFA] to-[#8884FF] text-[17px]' onClick={handleConfirm}>Continue</Button>
      </div>
    </div>
  );
};

export default SuccessSecure;