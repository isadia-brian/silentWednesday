import { useEffect,useState, useRef } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend,BarElement,CategoryScale,LinearScale } from "chart.js";
import { Bar,Doughnut } from 'react-chartjs-2';
import axios from 'axios'

ChartJS.register(ArcElement,Tooltip,Legend, BarElement,CategoryScale,LinearScale)

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

    }

    const [data, setData] = useState({
      labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['red', 'green','yellow']
        }]
    })

 
    
    
       

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
              backgroundColor: ['red', 'green','yellow'],
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
       <div className="h-72 w-72 ">
       <Doughnut data={data} />
      </div>
      <div className="">
      <Bar
      data={rawData}
      options={options}
      ></Bar>
      </div>
    </div>
  )
}

export default ChartComponent
