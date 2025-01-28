import { useLocation } from "react-router-dom";
import backgroundSvg from "../assets/background.svg";
import ImportHeader from "@/components/ImportHeader";
import { Search } from "lucide-react";
import { cryptoDataType } from "@/lib/cryptoDataType";
import { useState } from "react";
import TokenListForSelect from "@/components/TokenListForSelect";

export default function SelectToken() {

  const location = useLocation();
  const data: cryptoDataType[] = location.state.data;

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div
      className="w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start"
      style={{ backgroundImage: `url(${backgroundSvg})` }}
    >

      <ImportHeader success={false} content={location.state.content} />

      <div className="w-full h-screen overflow-auto scrollbar-none flex flex-col justify-between flex-1 py-3 px-4 text-red items-center">
        <div className="w-full h-full p-4 pt-0">
          <div className="relative w-full mt-5">
            <input type="text" className="bg-gray-50 bg-opacity-5 border border-gray-300 text-white text-sm rounded-lg block w-full ps-2 p-2.5" value={searchValue} placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
              <Search className='text-white' />
            </button>
          </div>
          <TokenListForSelect content={location.state.content} cryptoData={data.filter((item) => item.ticker.toLowerCase().search(searchValue.toLowerCase()) > -1)} />
        </div>
      </div>
    </div>
  );
}