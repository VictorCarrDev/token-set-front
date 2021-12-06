import { useWeb3React } from "@web3-react/core";

import { ERC20_ABI } from "../Abis/Protocol";
import { setAddress } from "../Abis/Address";
import { useEffect, useState } from "react";
import Web3 from "web3";

const GetBalanceOrText = () => {
  let { active, account, library } = useWeb3React();
  const [message, setMessage] = useState("You current holding is ?");
  
  useEffect(() => {
      const getBalance = async () => {
        if (active) {    
          const erc20 = await new library.eth.Contract(ERC20_ABI, setAddress);
          const amount = await erc20.methods.balanceOf(account).call();
          console.log(amount)
          
        setMessage((preState)=>{return "You current holding is " + Number(
          Web3.utils.fromWei(amount.toString())
        ).toFixed(4)})
        }
      };
        getBalance()
  }, [active,account,library]);

  return <p className="text-center text-lg">{message}</p>;
};

export default GetBalanceOrText;
