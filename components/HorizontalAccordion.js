import { useState } from "react";
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import {
  MdKitchen,
  MdKingBed,
  MdScreenshotMonitor,
  MdStarRate,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { Collapse } from "react-collapse";
import axios from "axios";

const HorizontalCard = ({ title, description, price, image, guests, id }) => {
  const [details, setDetails] = useState({
    houseName: title,
    guests: guests,
    description: description,
    amount: price,
    id: id,
  });

  const [open, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedHouse = await axios.put("/api/updateHouse/update", details);
      setIsOpen(!open);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="h-full">
      <div className="mt-10 w-full">
        <div className="shadow-2xl px-4 py-4">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0  ">
            <div className="relative h-[250px] md:h-[300px] md:min-w-[400px]">
              <Image src={image} alt={title} fill />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between w-full">
                  <h4 className=" text-lg md:text-2xl font-semibold ">
                    {title}
                  </h4>
                </div>

                <div className="flex space-x-1">
                  <p className="text-yellow-500">
                    <MdStarRate />
                  </p>
                  <p className="text-yellow-500">
                    <MdStarRate />
                  </p>
                  <p className="text-yellow-500">
                    <MdStarRate />
                  </p>
                  <p className="text-yellow-500">
                    <MdStarRate />
                  </p>
                  <p className="text-yellow-500">
                    <MdStarRate />
                  </p>
                </div>

                <div className="mt-4 flex space-x-2">
                  <div className="flex space-x-2">
                    <p>
                      <HiUsers />
                    </p>
                    <p className="text-slate-500 text-xs">{guests}-Guests</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-[18px]  my-6 text-slate-500  ">
                  <AiOutlineWifi />
                  <FaSwimmingPool />
                  <MdKingBed />
                  <MdKitchen />
                  <MdScreenshotMonitor />
                </div>
              </div>

              <p className="text-sm mb-6 line-clamp-4">{description}</p>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-2 md:space-y-0">
                <div>
                  <span className="text-sm  text-yellow-500">From</span>
                  <p className="text-3xl -mt-2 font-bold">
                    KES {price}
                    <span className="text-sm font-light"> per night</span>
                  </p>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3  bg-green-800 text-white"
                  onClick={() => setIsOpen(true)}
                >
                  EDIT HOUSE
                </button>
              </div>
            </div>
          </div>
          <div>
            <Collapse isOpened={open}>
              <div className={open ? "active" : "inactive"}>
                <div className="border-gray-400 border-t mt-16 pt-9">
                  <form className="">
                    <div className="flex items-center w-full justify-between">
                      <p className="font-bold">Edit House Details</p>
                      <p
                        className="text-3xl bg-red-500 rounded-full text-white cursor-pointer"
                        onClick={() => setIsOpen(false)}
                      >
                        <AiOutlineCloseCircle />
                      </p>
                    </div>

                    <div className="md:max-w-[700px]">
                      <div className="grid  gap-2 gap-y-8 mt-6">
                        <div className="flex flex-col">
                          <label>House Name</label>
                          <input
                            type="text"
                            name="houseName"
                            value={details.houseName}
                            className="border px-4 outline-none py-2 placeholder:text-[12px]"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label>Amount</label>
                          <input
                            type="text"
                            name="amount"
                            value={details.amount}
                            className="border px-4 outline-none py-2 placeholder:text-[12px]"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label>No Of Guests</label>
                          <input
                            type="number"
                            name="guests"
                            value={details.guests}
                            className="border px-4 outline-none py-2 placeholder:text-[12px]"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="flex flex-col mb-8">
                          <label>House Description</label>
                          <textarea
                            type="text"
                            name="description"
                            value={details.description}
                            rows={5}
                            className="border px-4 outline-none py-2"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 mb-8 bg-green-800 text-white"
                        onClick={(event) => handleFormSubmit(event)}
                      >
                        CONFIRM
                      </button>
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
