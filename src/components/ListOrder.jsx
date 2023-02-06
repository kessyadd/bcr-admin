import React, { useState } from "react";
import { DatePicker } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import APIOrder from "../apis/APIOrder";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Car Rented Bar Chart",
    },
  },
};

export const generateDataChart = (labels, datasets) => ({
  labels,
  datasets,
});

const lastDate = (y, m) => new Date(y, m, 0).getDate();

function ChartData() {
  const [data, setData] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { month } = Object.fromEntries(formData);
    if (month) {
      const [y, m] = month.split("-");
      const last = lastDate(y, m);
      const from = `${y}-${m}-01`;
      const until = `${y}-${m}-${last}`;

      if (from && until)
        APIOrder.getOrderReports({ from, until }).then((res) => {
          const datasets = [];
          const labels = [];
          const datasetItem = { label: "Car Rented", data: [], backgroundColor: "#586B90" };
          res.forEach(({ day, orderCount }) => {
            labels.push(day.split("-")[2]);
            datasetItem.data.push(orderCount);
          });
          datasets.push(datasetItem);
          setData(generateDataChart(labels, datasets));
        });
    }
  };

  return (
    <div>
      <h1>Rented Car Data Visualization</h1>
      <h2>Month (for example select Aug 2022)</h2>
      <form onSubmit={onSubmit}>
        <DatePicker picker="month" name="month" required />
        <button type="submit">Go</button>
      </form>
      {Object.values(data).length > 0 && <Bar options={options} data={data} />}
    </div>
  );
}

export default ChartData;
