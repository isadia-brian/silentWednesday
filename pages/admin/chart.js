import { useEffect,useState, useRef } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend,BarElement,CategoryScale,LinearScale, RadialLinearScale } from "chart.js";
import { Bar,Doughnut, PolarArea } from 'react-chartjs-2';
import axios from 'axios'
import LineComponent from "@/components/LineComponent";

ChartJS.register(ArcElement,Tooltip,Legend, BarElement,CategoryScale,LinearScale, RadialLinearScale)

const ChartComponent = () => {
  
    // const [rawData, setRawData] = useState({
    //   labels:["2 Bedroom Executive Accomodation","2 Bedroom Standard Accomodation","1 Bedroom Studio Accomodation"],
    //   datasets:[{
    //     label:'Poll',
    //     data:[30000,24000,15000],
    //     backgroundColor:['red','green','yellow'],
    //     borderWidth:0
    //   }]
    // });

    const [rawData,setRawData] = useState({
      labels:[],
      datasets:[{
        label:"",
        data:[],
        backgroundColor:["red","green","yellow"],
        borderWidth:0

      }]
    })

    const options = {
      plugins: {
    legend: {
      position: 'right', // Position the legend on the right side
      labels: {
        usePointStyle: true, // Use point style for the labels
        boxWidth:100,
        font:{ 
          size:10,
          weight:"bold"
        }
      },
    },
  },
    }

    const [data, setData] = useState({
      labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
    })

    const getBackgroundColors = (data) => {
  const max = Math.max(...data); // Calculate the maximum value
  const min = Math.min(...data); // Calculate the minimum value

  return data.map((value) => {
    if (value === max) return 'green'; // Assign green to the largest value
    if (value === min) return 'red'; // Assign red to the smallest value
    return 'yellow'; // Assign yellow to the remaining value
  });
};

 
    
    
       

    useEffect(()=>{
      async function getBookings(){
        try{
          const response = await axios.get('/api/getBookings')
        
          const houseTotals = {}
          response.data.forEach(booking => {
           
            const {house, amount} = booking;

            if (houseTotals[house]) {
              houseTotals[house] += amount;
              
            } else {
              houseTotals[house] = amount;
            }
          })

      

          const totalAmountArrays = Object.values(houseTotals)
          const houseNamesArray = Object.keys(houseTotals);
          
  
        
       
          setData({
            labels: houseNamesArray,
            datasets: [{
              data: totalAmountArrays,
              backgroundColor: getBackgroundColors(totalAmountArrays)
            }],
          });

          setRawData({
            labels: houseNamesArray,
            datasets: [{
              label:"Amount",
              data: totalAmountArrays,
              backgroundColor: ['red', 'green','yellow'],
              borderWidth:0,
              }],

          })

         

         
          
         

        }catch (error){
          console.log(error);
        }
      }
      getBookings()
    },[])

  

  



    
    
  return (
    <div className="h-screen">
     
       <p>Bar Chart</p>
       <div className="h-[400px] w-[900px] ">
       <Doughnut data={data} options={options} />
      </div>
      <div className="w-[800px]">
      <Bar
      data={rawData}
      options={options}
      ></Bar>
      </div>
      
      <div className="h-[500px] w-[500px]">
      <PolarArea data={data}/>
      </div>
      <div className="h-[700px] w-[700px]">
      <LineComponent/>
      </div>
      
    </div>
  )
}

export default ChartComponent
