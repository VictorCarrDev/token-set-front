import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
//1. Import coingecko-api
const CoinGecko = require("coingecko-api");

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
const getData = async (from, to) => {
  const result = await CoinGeckoClient.coins.fetchMarketChartRange("bitcoin", {
    from: from,
    to: to,
  });
  return result;
};

const options = {
  tooltips: {
    callbacks: {
      label: (item) => `${item.yLabel} $`,
    },
  },
  plugins: { legend: { display: false } },
  // scales: {
  //   xAxes: {
  //     display: false //this will remove all the x-axis grid lines
  //   }
  // },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const Chart = (props) => {
  const [xValues, setXValues] = useState([]);
  const [yValues, setYValues] = useState([0, 10, 5, 2, 20, 30, 45]);
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
    const range = (n) =>
      [...Array(n).keys()].map((num) => {
        const hour = (new Date().getHours()) - (n - num)
        return new Date(
          new Date().setHours(hour)
        ).toDateString();
      });

    let yData;
    let xData;
    const before = new Date(new Date().setDate(-70)) / 1000;
    console.log(before);
    const after = new Date() / 1000;
    getData(before, after).then((value) => {
      console.log(value.data.prices);
      xData = range(value.data.prices.length);
      yData = value.data.prices.map((cap) => {
        return cap[1];
      });

      setXValues(xData);
      setYValues(yData);
    });
  }, []);

  return (
    <div className=" w-6/12 mx-auto flex ">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
