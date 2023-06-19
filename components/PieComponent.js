import { useEffect,useState, useRef } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend,BarElement,CategoryScale,LinearScale, RadialLinearScale } from "chart.js";
import { Bar,Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(ArcElement,Tooltip,Legend, BarElement,CategoryScale,LinearScale, RadialLinearScale)

const PieComponent = ({houseNamesArray,houseTotalsArray}) => {

const types = houseNamesArray.map(houses=>{
  const type = houses.split(" ")[2];
  return type;
})

 

    const data = {
        labels:types,
          datasets: [{
            data: houseTotalsArray,
            backgroundColor: houseTotalsArray.map((total, index) => {
                if (total === Math.max(...houseTotalsArray)) {
                  return "green"; // Set green color for the highest value
                } else if (total === Math.min(...houseTotalsArray)) {
                  return "red"; // Set red color for the lowest value
                } else {
                  return "yellow"; // Set yellow color for the rest
                }
              }),
          }]
      }  

    
      
      
    

  

     

    

      const options = {
        // maintainAspectRatio: true,
        aspectRatio: 2, // Increase the aspect ratio to enlarge the chart
        cutout: "20%", // Adjust the cutout to control the size of the inner hole (doughnut hole)
        responsive: true,
        plugins: {
      legend: {
        position: 'right', // Position the legend on the right side
        labels: {
          usePointStyle: true, // Use point style for the labels
          boxWidth:40,
          font:{ 
            size:18,
            weight:"bold"
          },
          padding:18,
          color:'#fff'
        },
      },
    },
      }

     

     
  return (
    <div className="h-full w-full relative">
      <div className="absolute right-0 left-0 py-14 px-10 w-full">
      <Doughnut data={data} options={options} />
      </div>
      
    </div>
  )
}

export default PieComponent
