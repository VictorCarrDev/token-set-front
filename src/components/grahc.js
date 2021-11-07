import { Line } from "react-chartjs-2";
const data = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const options = {
  plugins: { legend: { display: false } },
  scales:{
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
  return (
    <div className="h-96 w-6/12 mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
