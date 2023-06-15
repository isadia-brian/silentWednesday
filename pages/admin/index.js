import {useState,useEffect} from 'react'
import { BsFillJournalBookmarkFill, BsFillBookmarkCheckFill, BsFillBookmarkDashFill, BsCashStack } from 'react-icons/bs'

import AdminLayout from "@/components/AdminLayout"
import axios from 'axios'
import {PieChart,Pie,Tooltip, BarChart,XAxis,YAxis,Legend,CartesianGrid,Bar,ResponsiveContainer,AreaChart, Area} from 'recharts'

import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

const Admin = () => {
  const [bookings, setBookings] = useState([])
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [houseAmounts, setHouseAmounts] = useState([]);

  




  useEffect(()=>{
    async function getAllBookings (){
      try {
        const response = await axios.get(`/api/getBookings`)
  
        setBookings(response.data)
        const pendingBookings = response.data.filter(
          (booking) => booking.bookingStatus === 'pending'
        );
        setPendingBookingsCount(pendingBookings.length)
        const confirmedBookings = response.data.filter(
          (booking) => booking.bookingStatus === 'Confirmed'
        );
        setConfirmedBookingsCount(confirmedBookings.length)

        // Calculate total amount
        const amountSum = response.data.reduce(
          (sum, booking) => sum + booking.amount,
          0
        );
        setTotalAmount(amountSum)

        

        // Calculate house-wise total amounts
        const houseTotals = {};
        response.data.forEach((booking) => {
          const { house, amount } = booking;
          
          if (houseTotals[house]) {
            houseTotals[house] += amount;
            
          } else {
            houseTotals[house] = amount;
          }
          
        });

        console.log(houseTotals);

        const totalAmountArrays = Object.values(houseTotals)
        const houseNamesArray = Object.keys(houseTotals);

        console.log(totalAmountArrays);
        console.log(houseNamesArray);
        

        // Convert houseTotals object into an array of objects
        const houseAmountsArray = Object.entries(houseTotals).map(([house, amount]) => ({
          name: house,
          
          totalAmount: amount,
        }));

    

      


       
        // Sort the array based on totalAmount in descending order
        console.log(houseAmountsArray.sort((a, b) => b.totalAmount - a.totalAmount));

        // Select top 3 houseAmounts
        const top3HouseAmounts = houseAmountsArray.slice(0, 3);
        setHouseAmounts(top3HouseAmounts);


        } catch (error) {
            console.log(error)
          
    }

    }
    getAllBookings()
  },[])
  return (
    <AdminLayout>
      <div className='px-4 bg-gray-100 h-screen'>
        <h4 className='text-lg font-bold'>Dashboard</h4>
        <div className='py-6 grid grid-cols-4 gap-2'>
          <div className='bg-white shadow-lg  rounded-xl p-4'>
            <div className='flex items-center justify-between border-b-[0.8px] pb-8 pl-4'>
              <p className='text-4xl text-emerald-800'>
                <BsCashStack/>
              </p>
              <div>
              <p className='font-bold text-sm text-gray-400'>TOTAL EARNINGS</p>
              <p className='text-3xl text-center text-green-800'>{totalAmount}</p>
              </div>
            </div>
          
          </div>
          <div className='bg-white shadow-lg  rounded-xl p-4'>
            <div className='flex items-center justify-between border-b-[0.8px] pb-8 pl-4'>
              <p className='text-4xl text-emerald-800'>
                <BsFillJournalBookmarkFill/>
              </p>
              <div>
              <p className='font-bold text-sm text-gray-400'>TOTAL BOOKINGS</p>
              <p className='text-3xl text-center text-green-800'>{bookings?.length}</p>
              </div>
            </div>
          
          </div>
          <div className='bg-white shadow-lg  rounded-xl p-4'>
            <div className='flex items-center justify-between border-b-[0.8px] pb-8 pl-4'>
              <p className='text-4xl text-emerald-800'>
                <BsFillBookmarkCheckFill/>
              </p>
              <div>
              <p className='font-bold text-sm text-gray-400'>CONFIRMED BOOKINGS</p>
              <p className='text-3xl text-center text-green-800'>{confirmedBookingsCount}</p>
              </div>
            </div>
          
          </div>
          <div className='bg-white shadow-lg  rounded-xl p-4'>
            <div className='flex items-center justify-between border-b-[0.8px] pb-8 pl-4'>
              <p className='text-4xl text-emerald-800'>
                <BsFillBookmarkDashFill/>
              </p>
              <div>
              <p className='font-bold text-sm text-gray-400'>PENDING BOOKINGS</p>
              <p className='text-3xl text-green-800 text-center'>{pendingBookingsCount}</p>
              </div>
            </div>
          
          </div>
         
        
    
        
      
      
     
        </div>
        <h3>Top 3 Houses by Total Amount:</h3>
       

        <PieChart width={400} height={400}>
          <Pie data={houseAmounts} dataKey="totalAmount" isAnimationActive={false} cx={150} cy={150} outerRadius={70} fill='#8884d8' label/>
          <Tooltip formatter={(value, name) => [`${name}: ${value}`,]}/>
        </PieChart>

        <div className='text-center'>
        
        </div>


      </div>
    </AdminLayout>
  )
}

export default Admin
