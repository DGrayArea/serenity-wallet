import TokenDetail from "./../assets/TokenDetail.svg"

type usdType = {
  usd: number
}

type marketType = {
  market_cap: usdType,
  total_volume: usdType,
  circulating_supply: number,
  total_supply: number,
  low_24h: usdType,
  high_24h: usdType,
  current_price: usdType,
  price_change_24h: number,
  price_change_percentage_24h: number
}

type coinType = {
  market_data: marketType,
  name: string,
  symbol: string,
  image: { large: string }
}

type PropsType = {
  coinData: coinType,
  balance: number
}

const TopBarTokenDetail = (props: PropsType) => {
  const data: coinType = props.coinData;
  const balance = props.balance;
  const changeUSD = data.market_data.price_change_24h;

  const changeValue = () => {
    return changeUSD > 0 ? ('+$' + (balance * changeUSD) + ' (+' + changeUSD + ')') : ('$' + (balance * changeUSD) + ' (' + changeUSD + ')');
  }

  return (
    <div className="w-full bg-[#00151F] relative px-4 py-6">
      <img src={TokenDetail} alt="TokenDetail" className="absolute right-0 top-0 h-full opacity-10" />
      <div className="w-full flex justify-between items-center">
        <div className="text-white">
          <p>{balance + ' ' + data?.symbol.toUpperCase()} </p>
          <p className="text-[#77E318]">{changeValue()}</p>
        </div>
        <div className="bg-[#0D0913] rounded-full p-2">
          <img src={data.image.large} alt={data.name} className="w-12 h-12 rounded-full" />
        </div>
      </div>
      <div className="flex text-white mt-4 justify-between w-full">
        <div>
          <p>Token Name</p>
          <p>{data.name + ' (' + data.symbol.toUpperCase() + ')'}</p>
        </div>
        <div>
          <p>Price</p>
          <p>{'$' + data.market_data.current_price.usd.toFixed(6)}</p>
        </div>
        <div>
          <p>Network</p>
          <p>{'solana'}</p>
        </div>
      </div>
    </div>
  );
};

export default TopBarTokenDetail;
