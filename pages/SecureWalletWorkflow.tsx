import backgroundSvg from '../assets/background.svg';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import keySvg from "../assets/key.svg";

const SecureWalletWorkflow = () => {
  const totalPages = 4;
  const [seed] = useState<string[]>([
    'then', 'vacant', 'girl', 'exist', 'avoid', 'usage', 'ride', 'alien', 'comic', 'cross', 'upon', 'hub',
  ]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePageBack = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }
  const handlePageNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }
  return (
    <div
    className="w-full h-[600px] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-between relative overflow-auto scrollbar-none"
    style={{ backgroundImage: `url(${backgroundSvg})` }}
  >
      <div className='absolute top-0 px-5 w-full h-[44px] flex justify-center items-center gap-3 backdrop-blur-md shadow-sm'>
        <a href='#' onClick={handlePageBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7211 16.0289C12.7797 16.0875 12.8127 16.1671 12.8127 16.25C12.8127 16.3329 12.7797 16.4124 12.7211 16.4711C12.6625 16.5297 12.5829 16.5627 12.5 16.5627C12.4171 16.5627 12.3375 16.5297 12.2789 16.4711L6.02891 10.2211C5.99985 10.1921 5.9768 10.1576 5.96108 10.1197C5.94535 10.0817 5.93726 10.0411 5.93726 9.99999C5.93726 9.95892 5.94535 9.91826 5.96108 9.88032C5.9768 9.84238 5.99985 9.80792 6.02891 9.7789L12.2789 3.5289C12.3079 3.49986 12.3424 3.47683 12.3803 3.46112C12.4183 3.4454 12.4589 3.43732 12.5 3.43732C12.5411 3.43732 12.5817 3.4454 12.6197 3.46112C12.6576 3.47683 12.6921 3.49986 12.7211 3.5289C12.7501 3.55793 12.7732 3.5924 12.7889 3.63034C12.8046 3.66827 12.8127 3.70893 12.8127 3.74999C12.8127 3.79105 12.8046 3.83171 12.7889 3.86965C12.7732 3.90758 12.7501 3.94205 12.7211 3.97108L6.69219 9.99999L12.7211 16.0289Z" fill="white" />
          </svg>
        </a>
        <div className="w-full bg-white rounded-full h-2.5 dark:bg-gray-700">
          <div className="rounded-full bg-gradient-to-l from-[#8884FF] to-[#573CFA] h-2.5 dark:bg-indigo-500" style={{width: `${currentPage/totalPages*100}%`}}></div>
        </div>
        <p className='text-white'>
          {`${currentPage}/${totalPages}`}
        </p>
      </div>
      <div className='flex-1 flex pt-32 flex-col items-center px-5'>
        {
          currentPage === 1 && <SeedPhraseInformation onNext={handlePageNext} /> ||
          currentPage === 2 && <WriteSeedPhrase onNext={handlePageNext} seed={seed} /> ||
          currentPage === 3 && <ConfirmSeedPhrase onNext={handlePageNext} seed={seed} /> ||
          currentPage === 4 && <Congratulations onNext={handlePageNext} />
        }
      </div>
    </div>
  )
}

export default SecureWalletWorkflow

const SeedPhraseInformation = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className='relative w-full h-full flex flex-col text-white'>
      <div className='w-full flex flex-col gap-2 my-5'>
        <p className='flex justify-center text-2xl font-semibold'>Secure Your Wallet</p>
        <p className='flex justify-center text-[#D4CAFF] text-base'>Secure your wallet’s seed phrase</p>
      </div>
      <a href='#' className='flex items-center gap-1 my-5 cursor-pointer'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.125 16.5C13.125 16.5995 13.0855 16.6948 13.0152 16.7652C12.9448 16.8355 12.8495 16.875 12.75 16.875C12.4516 16.875 12.1655 16.7565 11.9545 16.5455C11.7435 16.3345 11.625 16.0484 11.625 15.75V12C11.625 11.9005 11.5855 11.8052 11.5152 11.7348C11.4448 11.6645 11.3495 11.625 11.25 11.625C11.1505 11.625 11.0552 11.5855 10.9848 11.5152C10.9145 11.4448 10.875 11.3495 10.875 11.25C10.875 11.1505 10.9145 11.0552 10.9848 10.9848C11.0552 10.9145 11.1505 10.875 11.25 10.875C11.5484 10.875 11.8345 10.9935 12.0455 11.2045C12.2565 11.4155 12.375 11.7016 12.375 12V15.75C12.375 15.8495 12.4145 15.9448 12.4848 16.0152C12.5552 16.0855 12.6505 16.125 12.75 16.125C12.8495 16.125 12.9448 16.1645 13.0152 16.2348C13.0855 16.3052 13.125 16.4005 13.125 16.5ZM11.625 8.625C11.7733 8.625 11.9183 8.58101 12.0417 8.4986C12.165 8.41619 12.2611 8.29906 12.3179 8.16201C12.3747 8.02497 12.3895 7.87417 12.3606 7.72868C12.3317 7.5832 12.2602 7.44956 12.1553 7.34467C12.0504 7.23978 11.9168 7.16835 11.7713 7.13941C11.6258 7.11047 11.475 7.12532 11.338 7.18209C11.2009 7.23886 11.0838 7.33499 11.0014 7.45832C10.919 7.58166 10.875 7.72666 10.875 7.875C10.875 8.07391 10.954 8.26468 11.0947 8.40533C11.2353 8.54598 11.4261 8.625 11.625 8.625ZM21.375 12C21.375 13.8542 20.8252 15.6668 19.795 17.2085C18.7649 18.7502 17.3007 19.9518 15.5877 20.6614C13.8746 21.3709 11.9896 21.5566 10.171 21.1949C8.35246 20.8331 6.682 19.9402 5.37088 18.6291C4.05976 17.318 3.16688 15.6475 2.80514 13.829C2.44341 12.0104 2.62906 10.1254 3.33863 8.41234C4.04821 6.69929 5.24982 5.23511 6.79153 4.20497C8.33324 3.17483 10.1458 2.625 12 2.625C14.4856 2.62773 16.8686 3.61633 18.6261 5.37389C20.3837 7.13145 21.3723 9.51443 21.375 12ZM20.625 12C20.625 10.2941 20.1192 8.62658 19.1714 7.20821C18.2237 5.78983 16.8767 4.68434 15.3006 4.03154C13.7246 3.37873 11.9904 3.20793 10.3174 3.54073C8.64426 3.87352 7.10744 4.69498 5.90121 5.9012C4.69498 7.10743 3.87353 8.64426 3.54073 10.3173C3.20793 11.9904 3.37874 13.7246 4.03154 15.3006C4.68435 16.8767 5.78984 18.2237 7.20821 19.1714C8.62658 20.1192 10.2941 20.625 12 20.625C14.2867 20.6225 16.4791 19.713 18.0961 18.0961C19.713 16.4791 20.6225 14.2867 20.625 12Z" fill="#54D6FF" />
        </svg>
        <p className='underline text-[#54D6FF] font-semibold text-sm'>
          Why is it important?
        </p>
      </a>
      <div className='w-full flex flex-col gap-4 p-4 rounded-lg border border-[#8884FF] bg-[#171121]'>
        <p>Security lever: <span className='text-[#A0FF41]'>Very strong</span></p>
        <svg xmlns="http://www.w3.org/2000/svg" width="311" height="8" viewBox="0 0 311 8" fill="none">
          <rect width="32" height="8" rx="4" fill="#A0FF41" />
          <rect x="40" width="32" height="8" rx="4" fill="#A0FF41" />
          <rect x="80" width="32" height="8" rx="4" fill="#A0FF41" />
          <rect x="120" width="32" height="8" rx="4" fill="#A0FF41" />
        </svg>
        <p>Write down your seed phrase on of paper, take screenshot or store it in a safe place.</p>
        <p>Other options: Doesn't have to be paper!</p>
        <p>
          Tips:<br />
          • Store in bank vault<br />
          • Store in a safe<br />
          • Store in multiple secret places<br />
        </p>
        <p>
          Risks are:<br />
          • You lose it<br />
          • You forget where you put it<br />
          • Someone else finds it<br />
        </p>
      </div>
      <div className='absolute bottom-0 w-full p-5'>
        <Button
          className="w-full h-[50px] rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={onNext}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

const WriteSeedPhrase = ({ onNext, seed }: { onNext: () => void, seed: string[] }) => {
  const [revealed, setRevealed] = useState(false);
  const copySeedPhrase = async () => {
    try {
      // Copy seed to clipboard
      await navigator.clipboard.writeText(seed.join(' '));
    } catch (err) {
    }
  };
  const handleRevealSeed = () => {
    setRevealed(true);
  }
  return (
    <div className='relative w-full h-full flex flex-col text-white'>
      <div className='w-full flex flex-col gap-2 my-5'>
        <p className='flex justify-center text-2xl font-semibold text-center'>Write Down <br /> Your Seed Phrase</p>
        <p className='flex justify-center text-[#D4CAFF] text-base'>
          This is your seed phrase. Write it down
          on a paper and keep it in a safe place.
          You'll be asked to re-enter this phrase
          (in order) on the next step.
        </p>
      </div>
      <div className='relative w-full grid grid-cols-3 gap-2 p-4 rounded-lg border border-white backdrop-blur-sm overflow-hidden'>
        <div className={cn('absolute inset-0 z-50 w-full h-full flex flex-col justify-center items-center bg-black/60 backdrop-blur-[4px] cursor-pointer', revealed && 'hidden')} onClick={handleRevealSeed}>
          <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.8125 26.7922C35.7177 26.8475 35.6097 26.8761 35.5 26.875C35.3901 26.8752 35.2821 26.8464 35.187 26.7915C35.0918 26.7367 35.0127 26.6577 34.9578 26.5625L31.6531 20.7813C29.6887 22.2134 27.4647 23.2498 25.1047 23.8328L26.125 29.8969C26.1521 30.0604 26.1132 30.2279 26.0168 30.3627C25.9204 30.4975 25.7744 30.5885 25.6109 30.6157C25.5763 30.6217 25.5413 30.6248 25.5062 30.625C25.3585 30.6248 25.2156 30.5723 25.1029 30.4768C24.9902 30.3812 24.915 30.2489 24.8906 30.1032L23.889 24.0875C21.6512 24.4708 19.3644 24.4708 17.1265 24.0875L16.125 30.1032C16.1003 30.2505 16.0238 30.3841 15.9091 30.4798C15.7945 30.5756 15.6493 30.6271 15.5 30.625C15.4649 30.6248 15.4299 30.6217 15.3953 30.6157C15.2318 30.5885 15.0859 30.4975 14.9895 30.3627C14.8931 30.2279 14.8541 30.0604 14.8812 29.8969L15.8937 23.8297C13.5345 23.2474 11.311 22.2121 9.34685 20.7813L6.04217 26.5625C5.98723 26.6577 5.90819 26.7367 5.813 26.7915C5.71781 26.8464 5.60985 26.8752 5.49998 26.875C5.39026 26.8761 5.28229 26.8475 5.18748 26.7922C5.1162 26.7513 5.0537 26.6966 5.00357 26.6315C4.95343 26.5663 4.91664 26.4919 4.8953 26.4125C4.87397 26.3331 4.8685 26.2503 4.87923 26.1688C4.88995 26.0873 4.91665 26.0087 4.95779 25.9375L8.34529 20.0094C7.12262 19.0033 6.00636 17.8745 5.01404 16.6407C4.95578 16.5777 4.9111 16.5035 4.88276 16.4226C4.85443 16.3416 4.84305 16.2557 4.84934 16.1702C4.85563 16.0847 4.87944 16.0014 4.91931 15.9255C4.95918 15.8495 5.01424 15.7826 5.08108 15.7289C5.14791 15.6752 5.22508 15.6358 5.3078 15.6132C5.39051 15.5906 5.47699 15.5852 5.56187 15.5974C5.64674 15.6097 5.72818 15.6393 5.80114 15.6843C5.87409 15.7294 5.93699 15.789 5.98592 15.8594C8.66404 19.1735 13.3578 23.125 20.5 23.125C27.6422 23.125 32.3359 19.1735 35.014 15.8578C35.063 15.7874 35.1259 15.7278 35.1988 15.6828C35.2718 15.6377 35.3532 15.6081 35.4381 15.5959C35.523 15.5836 35.6094 15.589 35.6922 15.6116C35.7749 15.6342 35.852 15.6736 35.9189 15.7274C35.9857 15.7811 36.0408 15.848 36.0806 15.9239C36.1205 15.9998 36.1443 16.0831 36.1506 16.1686C36.1569 16.2542 36.1455 16.3401 36.1172 16.421C36.0889 16.5019 36.0442 16.5762 35.9859 16.6391C34.9936 17.8729 33.8773 19.0018 32.6547 20.0078L36.0422 25.9375C36.0833 26.0087 36.11 26.0873 36.1207 26.1688C36.1315 26.2503 36.126 26.3331 36.1047 26.4125C36.0833 26.4919 36.0465 26.5663 35.9964 26.6315C35.9463 26.6966 35.8838 26.7513 35.8125 26.7922Z" fill="white" />
          </svg>
          <p className='text-center text-base font-semibold mt-4 mb-2'>
            Tap to reveal <br />
            your seed phrase
          </p>
          <p className='text-center'>
            Make sure no one <br />
            is watching your screen.
          </p>
        </div>
        {
          seed.map((s, index) => (
            <div key={index} className='rounded bg-white text-black h-9 flex justify-center items-center'>
              {`${index + 1}. ${s}`}
            </div>
          ))
        }
      </div>
      <Button
        className="mt-6 w-full h-[50px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF]"
        style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        onClick={copySeedPhrase}
      >
        Copy to clipboard
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.3875 2.80005H7.94212C7.77234 2.80005 7.63341 2.93995 7.63341 3.11091V7.22955H3.60877C3.43898 7.22955 3.30005 7.3694 3.30005 7.54036V24.8892C3.30005 25.0602 3.43898 25.2001 3.60877 25.2001H21.058C21.2278 25.2001 21.3667 25.0602 21.3667 24.8892V20.7706H25.3913C25.5611 20.7706 25.7001 20.6307 25.7001 20.4597V3.11091C25.7001 2.93995 25.5611 2.80005 25.3913 2.80005H25.3875ZM20.7493 24.5784H3.91748V7.84733H20.7493V24.5784ZM25.0788 20.1489H21.359V7.53652C21.359 7.36555 21.22 7.22566 21.0503 7.22566H8.24312V3.41394H25.075V20.145L25.0788 20.1489Z" fill="white" />
        </svg>
      </Button>
      <div className='absolute bottom-0 w-full p-5'>
        <Button
          className="w-full h-[50px] rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

const ConfirmSeedPhrase = ({ onNext, seed }: { onNext: () => void, seed: string[] }) => {
  const [recalls, setRecalls] = useState<{ [key: number]: string }>({});
  const [verified, setVerified] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    setRecalls(prevRecalls => ({
      ...prevRecalls,
      [index]: value, // Update the corresponding index with the value
    }));
  };

  const confirmRecalls = () => {
    return Object.entries(recalls).every(([index, value]) => seed[Number(index)] === value);
  }

  const handleOnConfirm = () => {
    if (!verified) {
      setVerified(true);
    } else {
      onNext();
    }
  }

  useEffect(() => {
    const randomNumbers = new Set<number>();
    while (randomNumbers.size < 3) {
      const randomNumber = Math.floor(Math.random() * seed.length); // Generates numbers between 0 and seed.length - 1
      randomNumbers.add(randomNumber);
    }

    setRecalls(Object.fromEntries(
      Array.from(randomNumbers).map(num => [num, '']) // Create an object with random indices
    ));
  }, [seed]);

  return (
    <div className='relative w-full h-full flex flex-col text-white'>
      <div className='w-full flex flex-col gap-4 my-8'>
        <p className='flex justify-center text-2xl font-semibold text-center'>
          Write Down <br /> Your Seed Phrase
        </p>
        <p className='flex justify-center text-[#D4CAFF] text-base p-4 bg-[#1D162B] rounded-lg'>
          Type in your key phrase inside the blocks below
        </p>
      </div>
      <div className='relative w-full grid grid-cols-3 gap-2 p-4 rounded-lg border border-white backdrop-blur-sm overflow-hidden'>
        {seed.map((s, index) => (
          !verified && (index in recalls) ? (
            <input
              key={index} // Provide key prop for input
              type='text'
              value={recalls[`${index}`]}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className={cn('rounded text-center h-9 border border-[#573CFA] bg-[#251C37]')}
            />
          ) : (
            <div key={index} className={cn('rounded bg-white text-black h-9 flex justify-center items-center',
              verified && (index in recalls) ? recalls[`${index}`] === s ? 'bg-[#93FF503D] border border-[#93FF50] text-[#93FF50]' : 'bg-[#FF42313D] border border-[#FF4231] text-[#FF4231]' : '')}
            >
              {`${index + 1}. ${s}`}
            </div>
          )
        ))}
      </div>
      <div className='absolute bottom-0 w-full p-5'>
        <Button
          className="w-full h-[50px] rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={handleOnConfirm}
          disabled={verified && !confirmRecalls()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

const Congratulations = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className='relative w-full h-[600px] flex flex-col text-white'>
      <div className='w-full flex flex-col gap-4 my-8'>
        <div className='flex flex-col gap-4 items-center'>
          <img
            src={keySvg}
            className='w-[180px] h-auto'
            alt='key'
          />
          <div className='text-[34px] text-white text-center'>
            Congratulations!
          </div>
          <div className='flex flex-col gap-4'>
            <p className='text-base font-light text-[#D4CAFF] tracking-wide'>
              You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!
            </p>
            <p className='text-base font-light text-[#D4CAFF] tracking-wide'>
              Our wallet cannot recover your wallet should you lose it. You can find your seed phrase in <span className='font-semibold text-[#54D6FF]'>{`Setting > Security`}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 w-full p-5'>
        <Button
          className="w-full h-[50px] rounded-full hover:bg-purple-700"
          style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
          onClick={onNext}
        >
          Start
        </Button>
      </div>
    </div>
  )
}