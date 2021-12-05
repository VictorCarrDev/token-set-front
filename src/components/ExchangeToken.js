import { protocolAbi } from "../Abis/Protocol";
import { protocolAddress, defaultReferralAddress } from "../Abis/Address";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import Web3 from "web3";
const ExchangeToken = (props) => {
  let { active, account, library } = useWeb3React();

  const [amount, setAmount] = useState();
  const [refAddress, setrefAddress] = useState(defaultReferralAddress);
  const [referrer, setReferrer] = useState(false);
  const [maticCost, setMaticCost] = useState(0);

  useEffect(() => {
    if (active && !isNaN(amount) && amount !== "") {
      const getAmountIn = async () => {
        const protocol = await new library.eth.Contract(
          protocolAbi,
          protocolAddress
        );
        console.log(amount);
        try {
          setMaticCost(
            await protocol.methods
              .costSetWithETH(Web3.utils.toWei(amount))
              .call()
          );
        } catch (error) {
          if (error.message.includes("ds-math-sub-underflow")) {
            alert(
              "No hay Suficiente Liquidity para Matic x" + amount + " SetTokens"
            );
          }
        }
      };

      getAmountIn();
    }
  }, [amount, active, account, library]);

  const sellTokenSet = async () => {
    if (active) {
      const protocol = await new library.eth.Contract(protocolAbi, refAddress);

      // console.log( await protocol.methods.costSetWithETH(Web3.utils.toWei('1')).call())

      const transaction = await protocol.methods
        .SellSetForETH(Web3.utils.toWei(amount))
        .send({ from: account });
      console.log(transaction);
    }
  };

  const buyTokenSet = async () => {
    if (active) {
      const protocol = await new library.eth.Contract(protocolAbi, protocolAddress);

      // console.log( await protocol.methods.costSetWithETH(Web3.utils.toWei('1')).call())

      const transaction = await protocol.methods
        .buySetWithETH(Web3.utils.toWei(amount),refAddress)
        .send({ from: account, value:maticCost });
      console.log(transaction);
    }
  };

  if (props.buy === true) {
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
        {referrer ? (
          <input
            placeholder=" 0x00......."
            onChange={(e) => {
              if (Web3.utils.isAddress(e.target.value)) {
                setrefAddress(e.target.value);
              }
            }}
            type="text"
            className="mx-8 rounded-md ring ring-gray-600 focus:outline-none focus:ring-gray-800 flex-grow"
          ></input>
        ) : (
          <button
            onClick={() => {
              setReferrer(true);
            }}
            className="ring-1 ring-gray-500 active:bg-gray-500 active:text-white rounded-md px-6 mx-8"
          >
            Add Referral?
          </button>
        )}

        <span className="m-auto font-light">
          {`Aproximate value ${Number(
            Web3.utils.fromWei(maticCost.toString())
          ).toFixed(4)} MATIC`}{" "}
        </span>

        <div className="flex justify-center gap-8 px-20">
          <button
            onClick={props.cancelFunction}
            className="ring-1 ring-gray-500 hover:bg-gray-500 rounded-md py-2 px-6"
          >
            Cancel
          </button>
          <button
            onClick={buyTokenSet}
            className="hover:bg-gray-700 bg-gray-500 text-white rounded-md flex py-2 px-8"
          >
            Buy
          </button>
        </div>
      </div>
    );
  } else {
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
        <span className="m-auto font-light">
          {`Aproximate value ${Number(
            Web3.utils.fromWei(maticCost.toString())
          ).toFixed(4)} MATIC`}{" "}
        </span>

        <div className="flex justify-center gap-8 px-20">
          <button
            onClick={props.cancelFunction}
            className="ring-1 ring-gray-500 hover:bg-gray-500 rounded-md py-2 px-6"
          >
            Cancel
          </button>
          <button
            onClick={buyTokenSet}
            className="hover:bg-gray-700 bg-gray-500 text-white rounded-md flex py-2 px-8"
          >
            Buy
          </button>
        </div>
      </div>
    );
  }
};
export default ExchangeToken;
