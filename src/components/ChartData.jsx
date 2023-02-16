import React, { useEffect, useState } from "react";
import { DatePicker, Image } from "antd";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import APIOrder from "../apis/APIOrder";
import "../assets/css/chartData.css";
import RECTANGLE from "../assets/img/blue-rectangle.png";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

export const generateDataChart = (labels, datasets) => ({
  labels,
  datasets,
});

const lastDate = (y, m) => new Date(y, m, 0).getDate();

const date = new Date();
const month2 = date.getMonth() + 1;
const year = date.getFullYear();
const currentMonth = `${year}-${month2}`;

function ChartData() {
  const [data, setData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [status, setStatus] = useState("loading");

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { month } = Object.fromEntries(formData);
    setSelectedMonth(month);
    setStatus("loading");
  };
  useEffect(() => {
    const setChartData = (month3) => {
      if (status === "loading") {
        const [y, m] = month3.split("-");
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
        setStatus("done");
      }
    };
    setChartData(selectedMonth);
  }, [selectedMonth, status]);

  return (
    <div>
      <div>
        <div className="dashboard-chart-title">
          <p>
            <Image className="blue" src={RECTANGLE} alt="rectangle" />
            Rented Car Data Visualization
          </p>
        </div>
      </div>
      <div className="dashboard-mounth-title">
        <p>
          Month <i>(for example select Oct 2022)</i>
        </p>
      </div>
      <form onSubmit={onSubmit} className="chart-form">
        <DatePicker id="date-picker" picker="month" name="month" required />
        <button type="submit" className="go-btn">
          Go
        </button>
      </form>
      <div>
        <p className="chart-title">{selectedMonth} Rented Car Chart</p>
      </div>
      {Object.values(data).length > 0 && <Bar options={options} data={data} />}
    </div>
  );
}

export default ChartData;
