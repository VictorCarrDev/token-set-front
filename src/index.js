import ReactDOM from 'react-dom';
import './index.css';
import { Web3ReactProvider } from "@web3-react/core";
import App from './App';
import web3 from "web3";


const getLibrary = (provider) => {
  return new web3(provider);
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
  < App/>
  </Web3ReactProvider>
,
 document.getElementById('root'));

