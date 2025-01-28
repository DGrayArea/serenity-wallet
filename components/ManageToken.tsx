import { cryptoDataType } from "@/lib/cryptoDataType";
import { cn } from "@/lib/utils";
import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import TokenList from "./TokenList";

type PropsType = {
  className: string,
  cryptoData: Array<cryptoDataType>,
  changeSwitch: (flag: boolean, index: number) => void,
  stateManage: (state: boolean) => void
}

const ManageToken = (props: PropsType) => {

  const data = props.cryptoData
  const className = props.className;

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div className={cn("w-fill h-[70%] overflow-auto scrollbar-none bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-30 border-t border-[#947EAE] rounded-lg p-4 fixed bottom-0", className)}>
      <div className="bg-[#150f1f] bg-opacity-[72%] backdrop-filter backdrop-blur-lg p-4 z-50 sticky top-0">
        <div className="flex justify-between text-white">
          <ArrowLeft className="text-white" onClick={() => props.stateManage(false)} />
          <h1>Manage Token List</h1>
        </div>
        <p className="text-right text-white">Show or hide tokens from the list</p>
      </div>
      <div className="p-8 pt-0">
        <div className="relative w-full mt-5">
          <input type="text" className="bg-gray-50 bg-opacity-5 border border-gray-300 text-white text-sm rounded-lg block w-full ps-2 p-2.5" value={searchValue} placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
          <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
            <Search className='text-white' />
          </button>
        </div>
        <TokenList cryptoData={data.filter((item) => item.ticker.toLowerCase().search(searchValue.toLowerCase()) > -1)} changeSwitch={props.changeSwitch} />
      </div>
    </div>
  );
};

export default ManageToken;
