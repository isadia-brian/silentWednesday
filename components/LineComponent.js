import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement
);

const LineComponent = () => {
  const [housesArray, setHousesArray] = useState([]);

  useEffect(() => {
    async function getHouses() {
      try {
        const response = await axios.get("/api/getHouses");

        setHousesArray(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
    getHouses();
  }, []);

  // Create an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const colors = [
    "green",
    "yellow",
    "red",
    "orange",
    "purple",
    "cyan",
    "magenta",
    "yellow",
    "teal",
    "navy",
    "lime",
    "pink",
  ];

  // Create datasets for each house
  const datasets = housesArray.map((house, index) => {
    const data = monthNames.map((monthName) => {
      const monthData = house.months.find(
        (month) =>
          month.name === monthName && month.bookingStatus === "Confirmed"
      );

      return monthData ? monthData.amount : 0;
    });

    return {
      label: house.title,
      data,

      borderColor: colors[index % colors.length],
      pointBorderColor: "transparent",
      pointBorderWidth: 4,
    };
  });

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        grid: {
          borderDash: [10],
        },
      },
    },
  };
  const data = {
    labels: monthNames,
    datasets,
  };

  return <Line data={data} options={options} />;
};

export default LineComponent;
