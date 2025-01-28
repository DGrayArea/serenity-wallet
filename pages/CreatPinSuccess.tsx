"use client"

import { Button } from '@/components/ui/button';
import backgroundSvg from '../assets/background.svg';
import successSvg from '../assets/success.svg';
import { useNavigate } from 'react-router-dom';

const CreatePinSuccess = () => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    navigate("/face-id")
  }
  return (
    <div
      className="pb-6 w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-end gap-[280px]"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >
      <div className='flex flex-col px-5 w-full h-full'>
        <div className='grow flex flex-col justify-center items-center'>
          <div className='flex flex-col gap-8 items-center'>
            <img
              src={successSvg}
              className='w-[195px] h-auto'
              alt='logo'
            />
            <div className='text-[24px] text-[#77E318] w-[240px] text-center'>
              Your PIN ID has Successfully set up!
            </div>
          </div>
        </div>
        <Button
          className="w-full rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default CreatePinSuccess