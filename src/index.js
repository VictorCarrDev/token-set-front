import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import NavBar from './components/navbar';
import { Web3ReactProvider } from '@web3-react/core';

ReactDOM.render(
  <Web3ReactProvider>
    <NavBar />
  </Web3ReactProvider>,
 document.getElementById('root'));

