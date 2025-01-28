import { cryptoDataType } from "@/lib/cryptoDataType";
import { useNavigate } from "react-router-dom";

type PropsType = {
  cryptoData: Array<cryptoDataType>,
  content: string,
  changeSwitch?: (flag: boolean, index: number) => void,
}

const TokenListForSelect = (props: PropsType) => {

  const navigate = useNavigate();

  const data = props.cryptoData;

  const handleSelect = (index: number) => {
    if (props.content === "Buy")
      navigate('/buy/detail', { state: { selectToken: data[index].ticker } });
    else
      navigate('/send/input-address', { state: { data, selectToken: index } });
  }

  return (
    <>
      {
        data.map((item, index) => (
          <div className="mt-4 bg-[#0D0913] overflow-auto scrollbar-none bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-10 border border-[#947EAE] rounded-lg p-4 w-full flex justify-between items-center cursor-pointer" onClick={() => handleSelect(index)}>
            <div className="flex items-center w-full text-white">
              <img src={item.image} alt={`${item.ticker} logo`} className="w-10 h-10 mr-3 rounded-[50%]" />
              <div>
                <div className="font-semibold">{item.ticker}</div>
                <div className="text-gray-400 text-sm">{item.balance.toFixed(2) + ' ' + item.ticker}</div>
              </div>
            </div>
            <p className="text-white text-right">{'$' + item.usdBalance.toFixed(2)}</p>
          </div>
        ))
      }
    </>
  );
};

export default TokenListForSelect;
