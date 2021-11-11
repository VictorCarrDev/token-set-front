import { useState } from "react";

import "./index.css";

import NavBar from "./components/Navbar";
import { Web3ReactProvider } from "@web3-react/core";
import web3 from "web3";
import Chart from "./components/grahc";
import BuySell from "./components/BuySell";
import Modal from "./components/modal";

const getLibrary = (provider) => {
  return new web3(provider);
};

const App = () => {
  const [modalActive, setmodalActive] = useState(false);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Modal active={modalActive}></Modal>
      <NavBar />

      <p className="text-center ">hola</p>
      <Chart />
      <BuySell />
    </Web3ReactProvider>
  );
};

export default App;
