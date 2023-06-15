
import {useState,useEffect} from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
import AdminLayout from '@/components/AdminLayout'
import {Space,Table,Tag} from 'antd'

const GetBookings = () => {

    const router = useRouter();
    const { id } = router.query; 
    const [bookings, setBookings] = useState([])
    const handleConfirm = async (bookingId) => {
        try {
          // Make the API call to update the booking status
          const booking = await axios.put(`/api/allBookings/${bookingId}`);
          // Handle the response or perform any necessary actions
          console.log(booking.data);
        } catch (error) {
          // Handle errors
          console.log(error);
        }
      };
    const columns = [
        {
          title: 'Booking Id',
          dataIndex: '_id',
          key: '_id',
          render: (text) => <a>{text}</a>,
         width:10
        },
        {
          title: 'Names',
          dataIndex: `user`,
          key: 'user',
          render: (user) => <a>{user.firstName}  {user.lastName}</a>,
        },
        {
          title: 'Phone Number',
          dataIndex: `user`,
          key: 'user',
          render: (user) => <a>{user.phoneNumber}</a>,
        },
        {
          title: 'Email',
          dataIndex: `user`,
          key: 'user',
          render: (user) => <a>{user.email}</a>,
        },
        {
          title: 'Nationality',
          dataIndex: `user`,
          key: 'user',
          render: (user) => <a>{user.nationality}</a>,
        },
        {
          title: 'House',
          dataIndex: 'house',
          key: 'house',
        },
        {
          title: 'From',
          dataIndex: 'fromDate',
          key: 'fromDate',
        },
        
        {
          title: 'To',
          dataIndex: 'toDate',
          key: 'toDate',
        },
        {
            title: 'No of Days',
            dataIndex: 'totalDays',
            key: 'totalDays',
          },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
       
        {
          title: 'Booking Status',
          dataIndex: 'bookingStatus',
          key: 'bookingStatus',
        },
        
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
                {bookings.bookingStatus === 'pending'? <a onClick={()=>handleConfirm(record._id)}>Confirm {record.name}</a>: <a onClick={()=>handleConfirm(record._id)}>Pending {record.name}</a>}
              <a onClick={()=>handleConfirm(record._id)}>Confirm {record.name}</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];

     

    useEffect(()=>{
        async function fetchBookings (){

            try {
                const response = await axios.get(`/api/getBookings`)
          
                setBookings(response.data)
                } catch (error) {
                    console.log(error)
                
                
            } 
            
        }
        fetchBookings()
    },[bookings])

    
  return (
    <AdminLayout>

        <div>
         <Table dataSource={bookings} columns={columns}>


         </Table>

        </div>
      
    </AdminLayout>
  )
}

export default GetBookings
