import { cryptoDataType } from "@/lib/cryptoDataType";

type PropsType = {
  cryptoData: Array<cryptoDataType>,
  changeSwitch?: (flag: boolean, index: number) => void,
}

const TokenList = (props: PropsType) => {

  const data = props.cryptoData

  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    console.log(e.target.checked);
    if (props.changeSwitch)
      props.changeSwitch(e.target.checked, index);
  }

  return (
    <>
      {
        data.map((item, index) => (
          <div className="mt-4 bg-[#0D0913] bg-opacity-[72%] backdrop-filter backdrop-blur-lg z-10 border border-[#947EAE] rounded-lg p-4 w-full flex justify-between items-center">
            <div className="flex items-center w-full text-white">
              <img src={item.image} alt={`${item.ticker} logo`} className="w-10 h-10 mr-3 rounded-[50%]" />
              <div>
                <div className="font-semibold">{item.ticker}</div>
                <div className="text-gray-400 text-sm">{item.balance.toFixed(0) + ' ' + item.ticker}</div>
              </div>
            </div>
            <input
              className="mr-2 mt-[0.3rem] h-[21px] w-12 appearance-none rounded-full bg-[#1F1390] bg-opacity-30 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0px] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-[#1F1390] after:bg-opacity-20 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-[#1F1390] checked:after:absolute checked:after:z-[2] checked:after:mt-[1px] checked:after:ml-[20px] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-[#6C5EFA]"
              type="checkbox"
              role="switch"
              id="flexSwitchChecked"
              checked={item.flag}
              onChange={(e) => handleChangeSwitch(e, index)} />
          </div>
        ))
      }
    </>
  );
};

export default TokenList;
