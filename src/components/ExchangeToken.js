import { protocolAbi } from "../Abis/Protocol";
import { protocolAddress } from "../Abis/Address";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import Web3 from "web3";
const ExchangeToken = (props) => {
  let { active, account, library } = useWeb3React();

  const [amount, setAmount] = useState();

  const getBalance = async () => {
    if (active) {
      const protocol = await new library.eth.Contract(
        protocolAbi,
        protocolAddress
      );
      const transaction = await protocol.methods
        .buySetWithETH(Web3.utils.toWei(amount.toString()),protocolAddress)
        .send({ from: account, value: Web3.utils.toWei(amount.toString()) });
      console.log(transaction);
    }
  };

  return (
    <div className="  bg-gray-200 m-auto z-40 flex flex-col p-5 gap-4 rounded-lg transition-all ">
      <p className="border-gray-400 border-b-2 pb-1 text-lg text-gray-800 font-bold">
        Buy Tokens
      </p>
      <div className="flex gap-4">
        {/* <span className='flex-grow text-center'>Amount  </span> */}
        <input
          placeholder=" Amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
          className="mx-8 rounded-md ring ring-gray-600 focus:outline-none focus:ring-gray-800 flex-grow"
        ></input>
      </div>
      <span className="m-auto font-light">Aproximate value 0.00$ </span>
      <div className="flex justify-center gap-8 px-20">
        <button
          onClick={props.cancelFunction}
          className="ring-1 ring-gray-500 hover:bg-gray-500 rounded-md py-2 px-6"
        >
          Cancel
        </button>
        <button
          onClick={getBalance}
          className="hover:bg-gray-700 bg-gray-500 text-white rounded-md flex py-2 px-8"
        >
          Buy
        </button>
      </div>
    </div>
  );
};
export default ExchangeToken;
