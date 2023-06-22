import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function App() {
  const [heartRates, setHeartRates] = useState([]);
  const [rateChart, setRateChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetch("https://zany-plum-whale-vest.cyclic.app/getrate")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setHeartRates(result);
      });

    fetch("https://zany-plum-whale-vest.cyclic.app/getrate_chart")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRateChart({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: result.times,
            },
          },
          series: [
            {
              name: "heartrate",
              data: result.heartrates,
            },
          ],
        });
      });
  }, []);

  return (
    <div>
      <h1>กราฟอัตราเต้นของหัวใจ</h1>
      <ul>
        {heartRates.map((rate) => (
          <li key={rate.id}>
            Time:{rate.time} Heartrate:{rate.heartrate}
          </li>
        ))}
      </ul>
      <Chart
        options={rateChart.options}
        series={rateChart.series}
        type="bar"
        width="1000"
      />
    </div>
  );
}

export default App;
