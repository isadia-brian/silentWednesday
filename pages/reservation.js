import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ClientLayout from "@/components/ClientLayout";
import axios from "axios";
import { DatePicker, Space } from "antd";
import "antd/dist/reset.css";
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import {
  MdKitchen,
  MdKingBed,
  MdScreenshotMonitor,
  MdStarRate,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Collapse } from "react-collapse";
import { BsHouse } from "react-icons/bs";
import moment from "moment";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Reservation = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { RangePicker } = DatePicker;
  const [adults, setAdults] = useState(1);
  const [child, setChild] = useState(0);
  const [guests, setGuests] = useState(0);
  const [roomType, setRoomType] = useState("");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [open, setIsOpen] = useState(false);
  const [opend, setIsOpend] = useState(false);
  const [duplicateHouses, setDuplicateHouses] = useState([]);
  const [value, setValue] = useState();
  const [disableEnterDetails, setDisableEnterDetails] = useState(true);

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

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get("/api/getHouses");
        setHouses(response.data);
        setDuplicateHouses(response.data);
        setFilteredHouses(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchHouses();
  }, []);

  useEffect(() => {
    const createGuests = () => {
      let guestList = [];
      guestList = Number(adults) + Number(child);
      setGuests(guestList);
    };

    createGuests();
  });

  const filterByDate = (dates) => {
    setFromDate(moment(dates[0].$d).format("DD-MM-YYYY"));
    setToDate(moment(dates[1].$d).format("DD-MM-YYYY"));

    if (dates[0] && dates[1]) {
      setDisableEnterDetails(false);
    } else {
      setDisableEnterDetails(true);
    }

    var tempRooms = [];
    var availability = false;
    for (const house of duplicateHouses) {
      if (house.currentBookings.length > 0) {
        for (const booking of house.currentBookings) {
          if (
            !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability || house.currentBookings.length == 0) {
        tempRooms.push(house);
      }
      setFilteredHouses(tempRooms);
    }
  };

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

  const handleOpen = (event, houseId) => {
    event.preventDefault();
    setIsOpen((prevOpen) => (prevOpen === houseId ? false : houseId));
  };

  const handleConfirm = (houseId, house) => {
    const queryParams = {
      houseId: houseId,
      house: JSON.stringify(house),
      details: JSON.stringify(details),
      value,
      toDate: toDate,
      guests,
      fromDate: fromDate,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    router.push(`/book?${queryString}`, { toDate });
  };

  const handleClick = (event, houseId, house) => {
    event.preventDefault();
    handleConfirm(houseId, house);
  };

  return (
    <ClientLayout>
      <div className="bg-gray-100  h-fit py-12">
        <div className="h-full hidden md:flex w-[1000px] mx-auto relative">
          <div className="relative  h-fit w-full">
            <form className="w-full bg-white h-full px-6 py-4 rounded-full flex shadow-lg relative">
              <div className="flex items-center space-x-6 w-full">
                <div
                  className="flex items-center space-x-4 mt-1 "
                  onClick={() => setIsOpend(!opend)}
                >
                  <RangePicker
                    format="DD-MM-YYYY"
                    className="border-b-[0.8px] border-black"
                    onChange={filterByDate}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col border-b-[0.8px] border-black">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-bold text-green-800">
                        ADULTS
                      </label>
                      <AiOutlineUser />
                    </div>

                    <input
                      type="number"
                      max="6"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col border-b-[0.8px] border-black">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-bold text-green-800">
                        KIDS
                      </label>
                      <AiOutlineUser />
                    </div>
                    <input
                      type="number"
                      value={child}
                      onChange={(e) => setChild(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col border-b-[0.8px] grow border-black">
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] font-bold text-green-800">
                      ROOM TYPE
                    </label>
                    <BsHouse />
                  </div>

                  <select
                    className="text-sm  outline-none"
                    value={roomType}
                    onChange={(e) => filterByType(e.target.value)}
                  >
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

        <div className="mx-4 py-6 px-6 md:hidden bg-white mb-12">
          <div>
            <div className="flex flex-col">
              <div className="flex flex-col border-b-[0.8px] border-black">
                <div className="flex items-center justify-between w-full">
                  <label className="text-[12px] font-bold text-green-800">
                    ADULTS
                  </label>
                  <AiOutlineUser />
                </div>

                <input
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
              </div>
              <div className="flex flex-col border-b-[0.8px] border-black my-6">
                <div className="flex items-center justify-between w-full">
                  <label className="text-[12px] font-bold text-green-800">
                    KIDS
                  </label>
                  <AiOutlineUser />
                </div>
                <input
                  type="number"
                  value={child}
                  onChange={(e) => setChild(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-b-[0.8px] grow border-black">
            <div className="flex items-center justify-between">
              <label className="text-[12px] font-bold text-green-800">
                ROOM TYPE
              </label>
              <BsHouse />
            </div>

            <select
              className="text-sm  outline-none"
              value={roomType}
              onChange={(e) => filterByType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Executive">Executive</option>
              <option value="Standard">Standard</option>
              <option value="Studio">Studio</option>
            </select>
          </div>

          <div className="flex w-full mt-8 " onClick={() => setIsOpend(!opend)}>
            <RangePicker
              format="DD-MM-YYYY"
              className="border-b-[0.8px] border-black w-full"
              onChange={filterByDate}
            />
          </div>
        </div>

        <div className="md:w-[1000px] h-full md:mx-auto md:my-8">
          <p className="text-[12px] px-4 text-black">
            Showing available accomodations
          </p>

          {loading ? (
            <div className="px-4 h-screen">
              <h1>Loading...</h1>
            </div>
          ) : (
            <div className="h-full">
              {filteredHouses.map((house) => {
                return (
                  <div key={house._id}>
                    <div className="h-full">
                      <div className="mt-10 w-full">
                        <div
                          className={`shadow-2xl mx-2 px-4 py-4 ${
                            open ? "h-full" : "md:h-[330px]"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:space-x-8  ">
                            <div className="relative h-[300px] md:min-w-[400px]">
                              <Image
                                src={house.imageUrl}
                                alt={house.title}
                                fill
                              />
                            </div>
                            <div className="flex flex-col mt-3">
                              <div className="text-center">
                                <h1 className="text-xl md:text-2xl text-center md:text-left font-bold">
                                  {house.title}
                                </h1>
                                <span className="flex mt-4 md:-mt-2 w-full justify-center md:justify-normal">
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                  <p className="text-yellow-500 text-sm">
                                    <MdStarRate />
                                  </p>
                                </span>
                              </div>
                              <div className="flex items-center space-x-5 w-full justify-center mt-3 md:justify-normal md:mt-0">
                                <div className="flex items-center space-x-2">
                                  <p className=" text-gray-500 text-[15px]">
                                    <HiUsers />
                                  </p>
                                  <p className="text-gray-500 text-[15px]">
                                    {house.noOfGuests || 6} pax
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <p className=" text-gray-500 text-[15px]">
                                    <MdKingBed />
                                  </p>
                                  <p className="text-gray-500 text-[15px]">
                                    {house.rooms || 2} beds
                                  </p>
                                </div>
                              </div>
                              <div>
                                <span className="flex items-center md:space-x-3 mt-3 w-full justify-between max-w-[200px] mx-auto md:w-full md:mx-0 md:mt-0">
                                  <p className="text-[24px] text-green-900">
                                    <AiOutlineWifi />
                                  </p>
                                  <p className="text-[24px] text-green-900">
                                    <MdKitchen />
                                  </p>
                                  <p className="text-[24px] text-green-900">
                                    <MdScreenshotMonitor />
                                  </p>
                                  <p className="text-[24px] text-green-900">
                                    <FaSwimmingPool />
                                  </p>
                                </span>
                              </div>
                              <div>
                                <p className="line-clamp-4 text-center mt-3 md:text-left md:mt-0">
                                  {house.description}
                                </p>
                              </div>
                              <div>
                                <div className="flex flex-col mt-3 md:flex-row md:mt-0 items-center justify-between">
                                  <div>
                                    <span className="text-xs text-yellow-500">
                                      FROM
                                    </span>
                                    <p className="text-4xl  font-bold">
                                      KES {house.amount}
                                      <span className="text-sm font-thin">
                                        /PER NIGHT
                                      </span>
                                    </p>
                                  </div>
                                  <button
                                    disabled={disableEnterDetails}
                                    onClick={(event) =>
                                      handleOpen(event, house._id)
                                    }
                                    className={`text-white px-4 py-3 -mt-4 ${
                                      disableEnterDetails
                                        ? "bg-gray-300"
                                        : "bg-green-800"
                                    }`}
                                  >
                                    ENTER DETAILS
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Collapse isOpened={open === house._id}>
                              <div className={open ? "active" : "inactive"}>
                                <div className="border-gray-400 border-t mt-9  pt-9">
                                  <form>
                                    <div className="w-full flex flex-row-reverse">
                                      <p
                                        className="text-3xl md:hidden bg-red-500 rounded-full text-white cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <AiOutlineCloseCircle />
                                      </p>
                                    </div>
                                    <div className="flex items-center w-full justify-between">
                                      <p className="font-bold text-center">
                                        Your Booking Information -{" "}
                                        <span>
                                          {" "}
                                          {fromDate} - {toDate}{" "}
                                        </span>
                                      </p>
                                      <p
                                        className="text-3xl hidden md:flex bg-red-500 rounded-full text-white cursor-pointer"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        <AiOutlineCloseCircle />
                                      </p>
                                    </div>

                                    <p className="my-3">
                                      You have selected {adults} Adult(s) and{" "}
                                      {child} Kid(s)
                                    </p>
                                    <div>
                                      <p>Personal Information</p>
                                      <p>Enter your details below</p>
                                      <div className="grid md:grid-cols-3  gap-6 mt-6">
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
                                          <input
                                            name="phoneNumber"
                                            type="text"
                                            value={details.phoneNumber}
                                            className="border px-4 outline-none bg-white py-2 placeholder:text-[8px]"
                                            onChange={handleInputChange}
                                          />
                                        </div>
                                        <div className="flex flex-col">
                                          <label>
                                            Approximate Arrival Time
                                          </label>

                                          <select
                                            className="outline-none border px-2 py-2 text-[14px]"
                                            value={details.arrival}
                                            onChange={handleInputChange}
                                            name="arrival"
                                          >
                                            <option value="">
                                              Select Time
                                            </option>
                                            <option value="10:00 AM">
                                              10:00 AM
                                            </option>
                                            <option value="11:00 AM">
                                              11:00 AM
                                            </option>
                                            <option value="12:00 PM">
                                              12:00 NOON
                                            </option>
                                            <option value="1:00 PM">
                                              1:00 PM
                                            </option>
                                            <option value="2:00 PM">
                                              2:00 PM
                                            </option>
                                            <option value="3:00 PM">
                                              3:00 PM
                                            </option>
                                            <option value="4:00 PM">
                                              4:00 PM
                                            </option>
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
                                          <select
                                            className="outline-none border px-2 py-2 text-[14px]"
                                            value={details.nationality}
                                            onChange={handleInputChange}
                                            name="nationality"
                                          >
                                            <option value="">
                                              Select nationality
                                            </option>
                                            <option value="Kenyan">
                                              Kenyan
                                            </option>
                                            <option value="Foreigner">
                                              Foreigner
                                            </option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="w-full flex justify-between flex-row-reverse">
                                        <button
                                          type="submit"
                                          className="px-6 py-3 my-3  bg-green-800 text-white"
                                          onClick={(event) =>
                                            handleClick(event, house._id, house)
                                          }
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
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Reservation;
