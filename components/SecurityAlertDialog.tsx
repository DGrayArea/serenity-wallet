import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type SecurityAlertDialogProps = {
  open: boolean;
}

const SecurityAlertDialog = ({ open }: SecurityAlertDialogProps) => {
  const [check, setCheck] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleSecure = () => {

  }
  const handleSkip = () => {

  }
  useEffect(() => {
    if(check) {
      setConfirmOpen(true);
    }
  }, [check])
  return (
    <div>
      {/* Alert dialog overlay */}
      {open && (
        <div
          className="absolute h-full w-full inset-0 z-50 flex items-center justify-center bg-black/80 text-white"
          role="dialog"
          aria-modal="true"
        >
          {
            confirmOpen?
            /* Drawer box */
            <div className="bg-[#FFFFFF0A] bg-opacity-10 backdrop-blur-md absolute bottom-0 border border-[#FFFFFF3D] p-5 rounded-lg">
              <div className="w-full flex justify-center">
                <p className="text-2xl font-semibold">What is a 'Seed Phrase'</p>
              </div>
              <p className="text-[#D4CAFF] text-base my-5 tracking-wider">
                A seed phrase is a set of twelve words that contains all the information about your wallet, including your funds. It's like a secret code used to access your entire wallet.
                <br/><br/>
                You must keep your seed phrase secret and safe. If someone gets your seed phrase, they'll gain control over your accounts.
                <br/><br/>
                Save it in a place where only you can access it. <span className="text-[#FF4231]">If you lose it, not even Serenity can help you recover it.</span>
              </p>
              <Button
                className="w-full h-[44px] rounded-full hover:bg-purple-700"
                style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
                onClick={() => setConfirmOpen(false)}
              >
                I Got It
              </Button>
            </div>
            :
            /* Dialog box */
            <div className="bg-[#FFFFFF0A] bg-opacity-10 backdrop-blur-md m-4 rounded-lg shadow-lg p-5 border border-[#FFFFFF3D]">
              <div className="w-full flex justify-center">
                <p className="text-2xl font-semibold">Skip Account Security?</p>
              </div>
              <div className="w-full flex">
                <div className="inline-flex items-start">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-1 mr-2"
                    htmlFor="ripple-on"
                    data-ripple-dark="true"
                  >
                    <input type="checkbox"
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                      id="ripple-on"
                      checked={check}
                      onChange={(e) => setCheck(e.target.checked)}
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4.09998" y="3.6001" width="17.25" height="17.25" rx="2" fill="url(#paint0_linear_3477_1959)" />
                        <path d="M17.2646 8.68634C17.2413 8.63006 17.2071 8.57893 17.164 8.53587C17.1209 8.49277 17.0698 8.45857 17.0135 8.43524C16.9573 8.41191 16.8969 8.3999 16.836 8.3999C16.7751 8.3999 16.7147 8.41191 16.6585 8.43524C16.6022 8.45857 16.5511 8.49277 16.508 8.53587L10.3455 14.6984L7.89184 12.2447C7.80485 12.1577 7.68687 12.1089 7.56384 12.1089C7.44082 12.1089 7.32283 12.1577 7.23584 12.2447C7.14885 12.3317 7.09998 12.4497 7.09998 12.5727C7.09998 12.6958 7.14885 12.8138 7.23584 12.9007L10.0175 15.6824C10.0605 15.7255 10.1117 15.7597 10.168 15.783C10.2242 15.8064 10.2846 15.8184 10.3455 15.8184C10.4064 15.8184 10.4667 15.8064 10.523 15.783C10.5793 15.7597 10.6304 15.7255 10.6735 15.6824L17.164 9.19188C17.2071 9.14882 17.2413 9.09769 17.2646 9.04141C17.288 8.98513 17.3 8.9248 17.3 8.86387C17.3 8.80295 17.288 8.74262 17.2646 8.68634Z" fill="white" />
                        <defs>
                          <linearGradient id="paint0_linear_3477_1959" x1="21.35" y1="12.2251" x2="4.09998" y2="12.2251" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#8884FF" />
                            <stop offset="1" stop-color="#573CFA" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  </label>
                  <label className="cursor-pointer text-sm"
                    htmlFor="ripple-on"
                  >
                    I understand that if I lose my seed phrase I will not be able to access my wallet forever.
                  </label>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <Button
                  className="w-full h-[44px] rounded-full hover:bg-purple-700 backdrop-blur border border-[#FFF]"
                  style={{ background: 'rgba(255, 255, 255, 0.04)' }}
                  onClick={handleSkip}
                  disabled={!check}
                >
                  Skip
                </Button>
                <Button
                  className="w-full h-[44px] rounded-full hover:bg-purple-700"
                  style={{ background: 'linear-gradient(270deg, #8884FF 0%, #573CFA 100%)' }}
                  onClick={handleSecure}
                  disabled={!check}
                >
                  Secure Now
                </Button>
              </div>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default SecurityAlertDialog;