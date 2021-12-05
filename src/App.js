import { useState } from "react";
import "./index.css";

import NavBar from "./components/Navbar";
import { Web3ReactProvider } from "@web3-react/core";
import web3 from "web3";
import Chart from "./components/grahc";
import BuySell from "./components/BuySell";
import Modal from "./components/modal";
import ExchangeToken from "./components/ExchangeToken";
import GetBalanceOrText from "./components/GetBalance";

const getLibrary = (provider) => {
  return new web3(provider);
};

const App = () => {
  const [modalActive, setmodalActive] = useState(false);
  const [buy, setBuy] = useState(false);

  // useEffect(()=>{},[modalActive])
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Modal active={modalActive}>
        <ExchangeToken buy={buy} cancelFunction={() => setmodalActive(false)} />
      </Modal>
      <NavBar />

      <GetBalanceOrText />
      <Chart />
      <BuySell
        sellFunction={() => {
          setBuy(false);
          setmodalActive(true);
        }}
        buyFunction={() => {
          setBuy(true);
          setmodalActive(true);
        }}
      />
    </Web3ReactProvider>
  );
};

export default App;
