import { useWeb3React } from "@web3-react/core";
import {injected} from "../conector";

const NavBar = (props) => {
  let { chainId, active, activate, account } = useWeb3React();

  return (
    <div className="flex shadow-sm bg-gray-300 h-16">
      <div className="flex-grow " />
      <p className="m-auto px-2 ">{'Chain Id ' + chainId}</p>
      <div className="flex-grow " />

        {/* {active ? <p className="m-auto px-2 ">{account.slice(0,6)+ '...' + account.slice(-4)}</p> : null} */}

        
      <button
        className="hover:bg-gray-700 bg-gray-500 rounded-sm text-white px-6"
        type="button"
        onClick={()=>{activate(injected)}}
      >
        {active ? account.slice(0,6) + '...' + account.slice(-4) : 'Connect'}
      </button>
    </div>
  );
};

export default NavBar;
