import { cryptoDataType } from "@/lib/cryptoDataType";
import { useNavigate } from "react-router-dom";

type propsType = {
    data: Array<cryptoDataType>,
    searchValue: string
}
const CryptoTable = (props: propsType) => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg w-[95%]">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="py-2 px-4">
                            <div className="flex items-center">Name<svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                            </div>
                        </th>
                        <th className="py-2 px-4 flex-row-reverse">
                            <div className="flex items-center">Holdings<svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.filter((item) => item.flag === true && item.ticker.toLowerCase().search(props.searchValue.toLowerCase()) > -1).map((item: cryptoDataType, index: number) => (
                        <tr key={index} className="border-b border-gray-700" onClick={() => navigate('/token/detail', { state: { tokenAddress: item.mint, balance: item.balance } })}>
                            <td className="py-4 px-4 flex text-left">
                                <img src={item.image} alt={`${item.ticker} logo`} className="w-10 h-10 mr-3 rounded-[50%]" />
                                <div>
                                    <div className="font-semibold">{item.ticker}</div>
                                    <div className="text-gray-400 text-sm">{item.balance.toFixed(2) + ' ' + item.ticker}</div>
                                </div>
                            </td>
                            <td className="py-4 px-4 text-right">
                                <div className="font-semibold">${item.usdBalance.toFixed(2)}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoTable;
