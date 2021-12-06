import { useState, useEffect } from "react";
import "./index.css";

import NavBar from "./components/Navbar";
import { Web3ReactProvider } from "@web3-react/core";
import web3 from "web3";
import Chart from "./components/grahc";
import BuySell from "./components/BuySell";
import Modal from "./components/modal";
import ExchangeToken from "./components/ExchangeToken";
import GetBalanceOrText from "./components/GetBalance";
import ListOfTokens from './components/ListOfTokens'
import { useWeb3React } from "@web3-react/core";

// const getLibrary = (provider) => {
//   return new web3(provider);
// };

const App = () => {
  let { active } = useWeb3React();
  const [modalActive, setmodalActive] = useState(false);
  const [buy, setBuy] = useState(false);
  const[update,setUpdate]= useState(0)

  // useEffect(()=>{},[modalActive])
  // <Web3ReactProvider getLibrary={getLibrary}>
  return (<div>

      <Modal active={modalActive}>
        <ExchangeToken buy={buy} cancelFunction={() => {setmodalActive(false);setUpdate((prevState)=>{return prevState+1})}} />
      </Modal>
      <NavBar />

      <GetBalanceOrText key={update}/>
      <ListOfTokens />
      <BuySell
        sellFunction={() => {
          if (!active) {
            alert('Please Connect to Metamask')
            return
          } 
          setBuy(false);
          setmodalActive(true);
        }}
        buyFunction={() => {
          if (!active) {
            alert('Please Connect to Metamask')
            return
          } 
          setBuy(true);
          setmodalActive(true);
        }}
        />
        </div>
      );
      // </Web3ReactProvider>
};

export default App;
