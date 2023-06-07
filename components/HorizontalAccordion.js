import { useState } from "react";
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { MdKitchen,MdKingBed,MdScreenshotMonitor, MdStarRate } from "react-icons/md";
import {HiUsers} from 'react-icons/hi'
import Link from "next/link";
import { useRouter } from "next/router";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { Collapse } from "react-collapse";

const HorizontalCard = ({title, description, price, image, guests,rooms,link, handleSubmit}) => {
  const [open, setIsOpen] = useState(false);
  const router = useRouter();
  const [details, setDetails] = useState({
    firstName: "Brian",
    lastName: "Lusigi",
    email: "brian@gmail.com",
    phoneNumber: "072269955",
    arrival: "1022",
    address: "kenyan",
    nationality: "kenyan",
    request: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the handleSubmit function passed from the Reservation component
    handleSubmit(details);
  };
 

  return (
    <div className="h-full">
      <div className="mt-10 w-full">
        <div className="shadow-2xl px-4 py-4">
        <div className="flex space-x-8  ">
          <div className="relative h-[300px] min-w-[400px]">
            <Image src={image} alt={title} fill />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between w-full">
              <h4 className="text-2xl font-semibold ">{title}</h4>
                 </div>
           
            <div className="flex space-x-1">
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            <p className="text-yellow-500"><MdStarRate/></p>
            </div>

            <div className="mt-4 flex space-x-2">
              <div className="flex space-x-2">
              <p><HiUsers/></p>
              <p className="text-slate-500 text-xs">{guests}-Guests</p>
              </div>
              <div className="flex space-x-2 items-center">
              <p><MdKingBed/></p>
              {rooms < 2?<p className="text-xs text-slate-500">{rooms}-bedroom</p>:<p className="text-xs text-slate-500">{rooms}-bedrooms</p>}
             
              </div>
           
            </div>
            <div className="flex items-center space-x-4 text-[18px] mt-6 text-slate-500  ">
              <AiOutlineWifi />
              <FaSwimmingPool />
              <MdKingBed />
              <MdKitchen />
              <MdScreenshotMonitor />
            </div>
            
            </div>
           
            <p className="text-sm pr-4 line-clamp-4">
           {description}
            </p>

            

            <div className="flex items-center justify-between w-full">
              <div>
                <span className="text-sm  text-yellow-500">From</span>
                <p className="text-3xl -mt-2 font-bold">KES {price}<span className="text-sm font-light"> per night</span></p>
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
  );
};

export default HorizontalCard;
