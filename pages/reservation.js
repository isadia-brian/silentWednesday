import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ClientLayout from "@/components/ClientLayout";
import axios from 'axios'
import { DatePicker, Space } from 'antd';
import 'antd/dist/reset.css';
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { MdKitchen,MdKingBed,MdScreenshotMonitor, MdStarRate } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import {HiUsers} from 'react-icons/hi'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Collapse } from "react-collapse";
import {BsHouse} from 'react-icons/bs'
import moment from 'moment'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



const Reservation = () => {
const [houses,setHouses] = useState([])
const [filteredHouses,setFilteredHouses]=useState([])
const [loading,setLoading]=useState(true)
const [error,setError] = useState(false)
const { RangePicker } = DatePicker;
const [adults, setAdults] = useState(1);
const [child, setChild] = useState(0);
const [guests, setGuests] = useState(false);
const [roomType, setRoomType]=useState("")
const [fromDate, setFromDate] = useState()
const [toDate, setToDate] = useState()
const [open, setIsOpen] = useState(false);
const [opend, setIsOpend] = useState(false);
const [duplicateHouses,setDuplicateHouses ] = useState([])
const [value, setValue] = useState()

const [details, setDetails] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  arrival: "",
  address: "",
  nationality: "",
  request: "",
});
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
};

const router = useRouter();

useEffect(()=>{


  const fetchHouses = async ()=>{
  try{

    const response = await axios.get('/api/getHouses')
    setHouses(response.data)
    setDuplicateHouses(response.data)
    setFilteredHouses(response.data)
    setLoading(false)
    }catch(error){
    setError(true)
}
      
      }
fetchHouses()
},[])



const filterByDate = (dates)=>{
  setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"))
  setToDate(moment(dates[1].$d).format("DD-MM-YYYY"))

  var tempRooms=[]
  var availability = false
  for(const house of duplicateHouses)
  {
    if(house.currentBookings.length>0){

      for(const booking of house.currentBookings){
          if(!moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(booking.fromDate,booking.toDate)&& !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(booking.fromDate,booking.toDate))
          {
            if
             (
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.toDate
              
             ) {
              availability=true
              
            }
          }
      }
     
    }
    if(availability || house.currentBookings.length==0){
      tempRooms.push(house)
    }
    setFilteredHouses(tempRooms)
  }

}

const filterByType = (e) => {
  setRoomType(e);

  // Filter by room type
  let tempRooms = duplicateHouses.filter((house) => house.roomType === e);

  // Filter by date range
  if (fromDate && toDate) {
    tempRooms = tempRooms.filter((house) => {
      const bookings = house.currentBookings;
      if (bookings.length === 0) {
        return true;
      }
      for (const booking of bookings) {
        const bookingFromDate = moment(booking.fromDate, "DD-MM-YYYY");
        const bookingToDate = moment(booking.toDate, "DD-MM-YYYY");
        if (
          moment(fromDate, "DD-MM-YYYY").isBetween(
            bookingFromDate,
            bookingToDate
          ) ||
          moment(toDate, "DD-MM-YYYY").isBetween(
            bookingFromDate,
            bookingToDate
          ) ||
          moment(fromDate, "DD-MM-YYYY").isSame(bookingFromDate) ||
          moment(toDate, "DD-MM-YYYY").isSame(bookingToDate)
        ) {
          return false;
        }
      }
      return true;
    });
  }

  setFilteredHouses(tempRooms);
};


const handleOpen =(event, houseId)=>{
  event.preventDefault();
  setIsOpen((prevOpen) => (prevOpen === houseId ? false : houseId))
}

const handleConfirm = (houseId,house) => {
  const queryParams = {
    houseId: houseId,
    house:JSON.stringify(house),
    details: JSON.stringify(details),
    value,
    toDate:toDate,
    fromDate:fromDate
  };

  const queryString = new URLSearchParams(queryParams).toString();
  router.push(`/book?${queryString}`,{toDate});
};

const handleClick = (event, houseId,house) => {
  event.preventDefault();
  handleConfirm(houseId,house);
};





  return (
    <ClientLayout>
      <div className="bg-gray-100  h-fit py-12">
      <div className="h-full w-[1000px] mx-auto relative">
      <div className="relative  h-fit w-full">
        <form className="w-full bg-white h-full px-6 py-4 rounded-full flex shadow-lg relative">
          <div className="flex items-center space-x-6 w-full">
            <div
              className="flex items-center space-x-4 mt-1 "
              onClick={() => setIsOpend(!opend)}
            >
              <RangePicker format="DD-MM-YYYY" className="border-b-[0.8px] border-black" onChange={filterByDate}/>
           
            </div>
            <div className="flex items-center space-x-2" onClick={()=>setGuests(!guests)}>
              <div className="flex flex-col border-b-[0.8px] border-black">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    ADULTS
                  </label>
                  <AiOutlineUser />
                </div>

                <input type="number" value={adults} readOnly />
              </div>
              <div className="flex flex-col border-b-[0.8px] border-black">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    KIDS
                  </label>
                  <AiOutlineUser />
                </div>
                <input type="number" value={child} readOnly />
              </div>
            </div>
            <div className="flex flex-col border-b-[0.8px] grow border-black">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    ROOM TYPE
                  </label>
                  <BsHouse />
                </div>

                <select className="text-sm  outline-none" value={roomType} onChange={(e)=>filterByType(e.target.value)}>
                <option value="">All</option>
                  <option value="Executive">Executive</option>
                  <option value="Standard">Standard</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>
          </div>

          
        </form>
      </div>

     

      
    </div>

        <div className="w-[1000px] h-full mx-auto my-8">
          <p className="text-[12px] text-black">Showing available accomodations</p>

          {
            loading?(<div className="h-screen"><h1>Loading...</h1></div>):(<div className="h-full">
               {filteredHouses.map((house)=>{
            return(
              <div key={house._id}>
                   <div className="h-full">
      <div className="mt-10 w-full">
        
        <div className={`shadow-2xl px-4 py-4 ${open ? 'h-full': 'h-[330px]'}`}>
        <div className="flex space-x-8  ">
          <div className="relative h-[300px] min-w-[400px]">
            <Image src={house.imageUrl} alt={house.title} fill />
          </div>
         <div className="flex flex-col">
          <div>
            <h1 className="text-2xl font-bold">{house.title}</h1>
            <span className="flex -mt-2">
              <p className="text-yellow-500 text-sm"><MdStarRate/></p>
              <p className="text-yellow-500 text-sm"><MdStarRate/></p>
              <p className="text-yellow-500 text-sm"><MdStarRate/></p>
              <p className="text-yellow-500 text-sm"><MdStarRate/></p>
              <p className="text-yellow-500 text-sm"><MdStarRate/></p>
            </span>
          </div>
          <div className="flex items-center space-x-5 ">
            <div className="flex items-center space-x-2">
              <p className=" text-gray-500 text-[15px]"><HiUsers/></p>
              <p className="text-gray-500 text-[15px]">{house.noOfGuests|| 6} pax</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className=" text-gray-500 text-[15px]"><MdKingBed/></p>
              <p className="text-gray-500 text-[15px]">{house.rooms|| 2} beds</p>
            </div>
          </div>
          <div>
            <span className="flex items-center space-x-3">
              <p className="text-[24px] text-green-900"><AiOutlineWifi/></p>
              <p className="text-[24px] text-green-900"><MdKitchen/></p>
              <p className="text-[24px] text-green-900"><MdScreenshotMonitor/></p>
              <p className="text-[24px] text-green-900"><FaSwimmingPool/></p>
            </span>
          </div>
          <div>
            <p className="line-clamp-4">{house.description}</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-yellow-500">FROM</span>
                <p className="text-4xl  font-bold">KES {house.amount}<span className="text-sm font-thin">/PER NIGHT</span></p>

              </div>
              <button onClick={(event)=>handleOpen(event, house._id)} className="px-4 py-3 -mt-4 text-white bg-green-800">ENTER DETAILS</button>
            </div>
          </div>
         </div>
        </div>
        <div>
        <Collapse isOpened={open === house._id}>
        <div className={open?"active":"inactive"}>
        <div className="border-gray-400 border-t  pt-9">
      <form>
        <div className="flex items-center w-full justify-between">
          <p className="font-bold">
            Your Booking Information -{" "}
            <span> 1st May 2022 - 2nd May 2022 </span>
          </p>
          <p
            className="text-3xl bg-red-500 rounded-full text-white cursor-pointer"
            onClick={()=>setIsOpen(false)}
          >
            <AiOutlineCloseCircle />
          </p>
        </div>

        <p className="my-3">You have selected {adults} Adult(s) and 0 Kid(s)</p>
        <div>
          <p>Personal Information</p>
          <p>Enter your details below</p>
          <div className="grid grid-cols-3  gap-6 mt-6">
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={details.firstName}
               
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                type="text"
               
                name="lastName"
                value={details.lastName}
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="flex flex-col row-span-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={details.email}
                placeholder="johndoe@gmail.com"
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            </div>
            
            <div className="flex flex-col">
              <label>Phone Number</label>
              <PhoneInput
              defaultCountry="KE"
    
    
      
      value={value}
      className="border px-4 outline-none bg-white py-2 placeholder:text-[8px]"
      onChange={setValue}/>
              
            </div>
            <div className="flex flex-col">
              <label>Approximate Arrival Time</label>
              
              <select className="outline-none border px-2 py-2 text-[14px]" value={details.arrival} onChange={handleInputChange} name="arrival">
                <option value = "">Select Time</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                 
                  
                </select>
            </div>
            <div className="flex flex-col">
              <label>Special Requests</label>
              <textarea
                type="text"
                name="request"
                value={details.request}
                className="border px-4 outline-none py-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={details.address}
                placeholder="e.g city"
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Nationality</label>
              <select className="outline-none border px-2 py-2 text-[14px]" value={details.nationality} onChange={handleInputChange} name="nationality">
                <option value="">Select nationality</option>
                  <option value="Kenyan">Kenyan</option>
                  <option value="Foreigner">Foreigner</option>
                  
                </select>
              {/* <input
                type="text"
                name="nationality"
                value={details.nationality}
              
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              /> */}
            </div>
            
          </div>

          <div className="w-full flex justify-between flex-row-reverse">
          <button
            type="submit"
            className="px-6 py-3 my-3  bg-green-800 text-white"
            onClick={(event) => handleClick(event,house._id,house)}
            >
            CONFIRM
            </button>
          </div>
         
          
         
         
        </div>
      </form>
    </div>
        </div>
        </Collapse>
        </div>
       
        
        
        </div>
        
      </div>
  
       
          
        
   
    </div>
              </div>
            )
          })}
            </div>)
          }
          
         
         
         
        </div>
      </div>
    </ClientLayout>
  );
};

export default Reservation;
