
import {useState,useEffect} from 'react'
import axios from 'axios'
import AdminLayout from '@/components/AdminLayout'

const GetBookings = () => {
    const [bookings, setBookings] = useState([])

    useEffect(()=>{
        async function fetchBookings (){

            try {
                const response = await axios.get(`/api/getBookings`)
                console.log(response.data);
                setBookings(response.data)
                } catch (error) {
                    console.log(error)
                
                
            } 
            
        }
        fetchBookings()
    },[])
  return (
    <AdminLayout>

        <div>
            {
                bookings.map((booking)=>{
                    return (
                        <p>{booking.amount}</p>
                    )
                })
            }
        </div>
      
    </AdminLayout>
  )
}

export default GetBookings
