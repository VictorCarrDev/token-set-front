import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
const getData = async () => {
  const result = await CoinGeckoClient.coins.fetchMarketChartRange('bitcoin', { from: 1392577232, to: 1422577232 });
  return result
};



const options = {
  plugins: { legend: { display: false } },
  scales: {
    xAxes: {
      display: false //this will remove all the x-axis grid lines
    }
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};


const Chart = (props) => {

  const [xValues, setXValues] = useState([])
  const [yValues, setYValues] = useState([0, 10, 5, 2, 20, 30, 45])
  const data = {
    labels: xValues,
    datasets: [
      {
        label: "USD",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: yValues,
      },
    ],
  };

  useEffect(() => {

    const range = n => [...Array(n).keys()]

    let yData
    let xData
    getData().then(value => {
      console.log(value.data.market_caps)
      xData = range(value.data.market_caps.length)
      yData = value.data.market_caps.map((cap) => {
        return cap[1]
      })

      setXValues(xData)
      setYValues(yData)
    })

  }, [])

  return (
    <div className=" w-6/12 mx-auto flex ">
      <Line data={data} options={options} />
    </div>
  )
};

export default Chart;
