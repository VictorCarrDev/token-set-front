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
  const [setValue, setSetValue] = useState('');

  const ListOfElement = (props) => {
    return (
      <div className="grid grid-cols-7 gap-2">
        <p className="text-center  m-auto">{props.name || "Unkown"}</p>
        <div className="col-span-4 my-auto h-1 border-b-2 border-gray-400"></div>
        <p className="text-center m-auto">{props.amount || "Unkown"}</p>
        <p className="text-center  m-auto">{props.cost || "Unkown"} $</p>
      </div>
    );
  };
  const getTokenName = async (address) => {
    if (active) {
      const erc20 = await new library.eth.Contract(ERC20_ABI, address);

      try {
        const name = await erc20.methods.name().call();
        return name;
      } catch (error) {
        return "";
      }
    }
  };

  const priceAndTotal = async (address, amount) => {
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/polygon-pos?contract_addresses=${address}&vs_currencies=usd`
    );

    const value = data.data[Object.keys(data.data)[0]].usd;
    const totalValue = Number(value) * Number(amount);
    return [value, totalValue];
  };

  const heavyfunction = async () => {
    if (active) {
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

      for (let index = 0; index < addresesList.length; index++) {
        const address = addresesList[index];
        const amount = amountList[index];

        const name = await getTokenName(address);
        const [price, Total] = await priceAndTotal(address, amount);

        tokenSetTotalValue += Number(Total);

          setComponent((prevState) => {
            return [<ListOfElement name={name} amount={amount} cost={price} />,...prevState];
          });
      }


      console.log(addresesList, amountList);
    }
  };

  useEffect(() => {
    heavyfunction();
  }, [active]);


  return (
    <div className="flex flex-col space-y-4 mx-48">
      <div className="grid grid-cols-7 gap-2">
        <p className="text-center  m-auto">Token Name</p>
        <div className="col-span-4 my-auto h-1"></div>
        <p className="text-center m-auto">Token Amount</p>
        <p className="text-center  m-auto">Cost $</p>
      </div>
      {/* <ListOfElement name='Token Name' amount='Token Amount' cost='cost $'/> */}
      {component.map((component, index) => (
        <Fragment key={index}>{component}</Fragment>
      ))}
      {/* <ListOfElement /> */}
    </div>
  );
};

export default ListOfTokens;
