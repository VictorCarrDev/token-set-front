// import { Component } from "react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { basicIssuanceAbi, ERC20_ABI } from "../Abis/Protocol";
import { basicIssuanceModuleAddress } from "../Abis/Address";
import { setAddress } from "../Abis/Address";
import axios from "axios";
const ListOfTokens = (props) => {
  let { active, library } = useWeb3React();
  const [component, setComponent] = useState([]);
  const [setValue, setSetValue] = useState("");

  const ListOfElement = (props) => {
    return (
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
        <p className="text-center  m-auto">{props.name || "Unkown"}</p>
        <div className="hidden sm:block  md:col-span-2 lg:col-span-4 my-auto h-1 border-b-2 border-gray-400"></div>
        <p className="text-xs font-semibold md:text-base md:font-normal text-center m-auto">{props.amount || "Unkown"}</p>
        <p className="text-xs font-semibold md:text-base md:font-normal text-center  m-auto">{props.cost || "Unkown"} $</p>
      </div>
    );
  };
  const getTokenName = async (address) => {
    if (active) {
      const erc20 = await new library.eth.Contract(ERC20_ABI, address);

      try {
        const name = await erc20.methods.name().call();
        const decimals = await erc20.methods.decimals().call();
        return [name, decimals];
      } catch (error) {
        return "";
      }
    }
  };

  const priceAndTotal = async (address, amount, decimal) => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${address}&vs_currencies=usd`
    );

    const value = data.data[Object.keys(data.data)[0]].usd;
    const totalValue = Number(value) * (Number(amount) / 10 ** Number(decimal));
    console.log(totalValue);
    return [value, totalValue];
  };

  const heavyfunction = async () => {
    if (active) {
      try {
        const basicIssue = await new library.eth.Contract(
          basicIssuanceAbi,
          basicIssuanceModuleAddress
        );

        const addressesAndValues = await basicIssue.methods
          .getRequiredComponentUnitsForIssue(setAddress, Web3.utils.toWei("1"))
          .call();

        const addresesList = addressesAndValues[0];
        const amountList = addressesAndValues[1];
        let tokenSetTotalValue = 0;
        setComponent([]);

        for (let index = 0; index < addresesList.length; index++) {
          const address = addresesList[index];
          const amount = amountList[index];

          const [name, decimals] = await getTokenName(address);
          const [price, Total] = await priceAndTotal(address, amount, decimals);
          tokenSetTotalValue += Number(Total);

          setComponent((prevState) => {
            return [
              <ListOfElement
                name={name}
                amount={amount / 10 ** decimals}
                cost={price}
              />,
              ...prevState,
            ];
          });
        }

        setSetValue(tokenSetTotalValue);

        console.log(addresesList, amountList);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    heavyfunction();
  }, [active]);

  return (
    <div className="flex flex-col space-y-4 mx-4 md:mx-16 lg:mx-48">
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
        <p className="text-center  m-auto">Token Name</p>
        <div className="hidden md:block md:col-span-2 lg:col-span-4 my-auto h-1"></div>
        <p className="text-center m-auto">Token Amount</p>
        <p className="text-center  m-auto">Cost of Token $</p>
      </div>
      {/* <ListOfElement name='Token Name' amount='Token Amount' cost='cost $'/> */}
      {component.map((component, index) => (
        <Fragment key={index}>{component}</Fragment>
      ))}
      <p className="m-auto text-2xl font-semibold text-blue-800">{`Token Set Value ${setValue} $`}</p>
    </div>
  );
};

export default ListOfTokens;
