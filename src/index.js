import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import NavBar from './components/Navbar';
import { Web3ReactProvider } from '@web3-react/core';
import web3 from 'web3';
import Chart from './components/grahc'
import BuySell from './components/BuySell';
import Modal from './components/modal';

const getLibrary = (provider) => {
  return new web3(provider)

}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Modal active={true}> 
      </Modal >
    <NavBar />

    <p className ='text-center ' >hola</p>
    <Chart/>
    <BuySell/>
  </Web3ReactProvider>,
 document.getElementById('root'));

