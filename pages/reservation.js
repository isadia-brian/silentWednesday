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

import format from "date-fns/format";
import moment from 'moment'

import HorizontalAccordion from "@/components/HorizontalAccordion";


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



   

    axios.get(`/api/getHouses`).then((res)=>{
      setHouses(res.data)
      setFilteredHouses(res.data)
    
     

  }).catch((error)=>{
    console.log(error)
  })





  
 

   


}, [])

const handleAvailabilityCheck = (selectedRoomType) => {
  const filtered = houses.filter((house) => house.roomType === selectedRoomType);
  setFilteredHouses(filtered);
};

const filterByDate = (dates)=>{


  
  setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"))


  
  setToDate(moment(dates[1].$d).format("DD-MM-YYYY"))

}

const handleConfirm = (houseId,house) => {
  const queryParams = {
    houseId: houseId,
    house:JSON.stringify(house),
    details: JSON.stringify(details),
    toDate:toDate,
    fromDate:fromDate
  };

  const queryString = new URLSearchParams(queryParams).toString();
  router.push(`/book?${queryString}`);
};

const handleClick = (event, houseId,house) => {
  event.preventDefault();
  handleConfirm(houseId,house);
};





  return (
    <ClientLayout>
      <div className="bg-gray-100  h-fit py-12">
      <div className="h-full w-[1100px] mx-auto relative">
      <div className="relative  h-fit w-full">
        <form className="w-full space-x-2 bg-white h-full px-6 py-4 rounded-full flex shadow-lg relative">
          <div className="flex items-center space-x-4 flex-grow">
            <div
              className="flex items-center space-x-4 "
              onClick={() => setIsOpend(!opend)}
            >
              <RangePicker format="DD-MM-YYYY" className="border-b-[0.8px] border-black" onChange={filterByDate}/>
           
            </div>
            <div className="flex items-center space-x-2" onClick={()=>setGuests(!guests)}>
              <div className="flex flex-col border-b-[0.8px] border-black max-w-[170px]">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    ADULTS
                  </label>
                  <AiOutlineUser />
                </div>

                <input type="number" value={adults} readOnly />
              </div>
              <div className="flex flex-col border-b-[0.8px] border-black max-w-[160px]">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    KIDS
                  </label>
                  <AiOutlineUser />
                </div>
                <input type="number" value={child} readOnly />
              </div>
            </div>
            <div className="flex flex-col border-b-[0.8px] border-black min-w-[190px]">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-bold text-green-800">
                    ROOM TYPE
                  </label>
                  <BsHouse />
                </div>

                <select className="text-sm mt-1 outline-none" value={roomType} onChange={(e)=>setRoomType(e.target.value)}>
                <option value="">Select Accomodation</option>
                  <option value="Executive">Executive</option>
                  <option value="Standard">Standard</option>
                  <option value="Studio">Studio</option>
                </select>
              </div>
          </div>

          <button onClick={handleAvailabilityCheck} className="text-sm bg-green-800 text-white font-bold rounded-full px-4">
            CHECK AVAILABILITY
          </button>
        </form>
      </div>

     

      
    </div>

        <div className="w-[1000px] h-full mx-auto my-8">
          <p className="text-[12px] text-black">Showing available accomodations</p>

          {
            !loading?(<div className="h-screen"><h1>Loading...</h1></div>):(<div className="h-full">
               {filteredHouses.map((house)=>{
            return(
              <div key={house._id}>
                   <div className="h-full">
      <div className="mt-10 w-full">
        <div className="shadow-2xl px-4 py-4">
        <div className="flex space-x-8  ">
          <div className="relative h-[300px] min-w-[400px]">
            <Image src={house.imageUrl} alt={house.title} fill />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between w-full">
              <h4 className="text-2xl font-semibold ">{house.title}</h4>
                 </div>
           
            <div className="flex space-x-1">
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            </div>

            <div className=" flex space-x-2">
              <div className="flex space-x-2">
              <p><HiUsers/></p>
              <p className="text-slate-500 text-xs">{house.noOfguests}-Guests</p>
              </div>
              <div className="flex space-x-2 items-center">
              <p><MdKingBed/></p>
              {house.rooms < 2?<p className="text-xs text-slate-500">{house.rooms}-bedroom</p>:<p className="text-xs text-slate-500">{house.rooms}-bedrooms</p>}
             
              </div>
           
            </div>
            <div className="flex items-center space-x-4 text-[18px] mt-2 text-slate-500  ">
              <AiOutlineWifi />
              <FaSwimmingPool />
              <MdKingBed />
              <MdKitchen />
              <MdScreenshotMonitor />
            </div>
            
            </div>
           
            <p className="text-sm pr-4 line-clamp-4">
           {house.description}
            </p>

            

            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-sm  text-yellow-500">From</span>
                <p className="text-3xl -mt-2 font-bold">KES {house.amount}<span className="text-sm font-light"> per night</span></p>
              </div>
             
              <button className="bg-green-800  px-5 py-3 font-bold text-sm  text-white" onClick={()=>setIsOpen(true)}>
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
        <div>
        <Collapse isOpened={open}>
        <div className={open?"active":"inactive"}>
        <div className="border-gray-400 border-t mt-16 pt-9">
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

        <p className="mt-5">You have selected 2 Adults and 0 kids</p>
        <div>
          <p>Personal Information</p>
          <p>Enter your details below</p>
          <div className="grid grid-cols-3 gap-2 gap-y-10 mt-6">
            <div className="flex flex-col">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={details.firstName}
                placeholder="John"
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                name="lastName"
                value={details.lastName}
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
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
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={details.phoneNumber}
                placeholder="johndoe@gmail.com"
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Approximate Arrival Time</label>
              <input
                type="clock"
                name="arrival"
                value={details.arrival}
                placeholder="--:--"
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
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
              <input
                type="text"
                name="nationality"
                value={details.nationality}
                placeholder="e.g resident"
                className="border px-4 outline-none py-2 placeholder:text-[12px]"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col mb-8">
              <label>Special Requests</label>
              <textarea
                type="text"
                name="request"
                value={details.request}
                className="border px-4 outline-none py-2"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <input type="checkbox" name="" id="" />
            <p>
              I acknowledge that i have read and agree to the terms & Conditions below
            </p>
          </div>
          <button
  type="submit"
  className="px-6 py-3 mb-8 bg-green-800 text-white"
  onClick={(event) => handleClick(event,house._id,house)}
>
  CONFIRM
</button>
          <div>
          <h5 className="font-bold text-2xl border-b-2">Terms & Conditions</h5>
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
