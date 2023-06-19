import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ClientLayout from "@/components/ClientLayout";
import Heading from "@/components/Heading";
import { BsPhone, BsCashStack } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import Image from "next/image";
import moment from "moment";
import axios from "axios";
const Book = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [arrival, setArrival] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [startDay, setStartDay] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endDay, setEndDay] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { houseId, house, details, fromDate, toDate } = router.query;
  const fromDay = moment(fromDate, "DD-MM-YYYY").format("DD");
  const fromThisDay = moment(fromDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  const fromMonth = moment(fromDate, "DD-MM-YYYY").format("MMM").toUpperCase();
  const toDay = moment(toDate, "DD-MM-YYYY").format("DD");
  const toThisDay = moment(toDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  const toMonth = moment(toDate, "DD-MM-YYYY").format("MMM").toUpperCase();
  const noOfDays = Number(toDay) - Number(fromDay) + 1;

  // Parse the JSON string back to objects

  const parsedDetails = details ? JSON.parse(details) : {};
  const parsedHouse = house ? JSON.parse(house) : {};
  const houseName = parsedHouse.title;
  const amountTotal = parsedHouse.amount * noOfDays;

  useEffect(() => {
    setFirstName(parsedDetails.firstName);
    setLastName(parsedDetails.lastName);
    setEmail(parsedDetails.email);
    setTitle(houseName);
    setContact(parsedDetails.phoneNumber);
    setAddress(parsedDetails.address);
    setNationality(parsedDetails.nationality);
    setSpecialRequest(parsedDetails.specialRequest);
    setArrival(parsedDetails.arrival);
    setStartDay(fromDay);
    setStartMonth(fromMonth);
    setAmount(amountTotal);
    setEndDay(toDay);
    setEndMonth(toMonth);
  }, [router.query]);

  const handlePost = async () => {
    const bookingDetails = {
      fromDate: fromThisDay,
      toDate: toThisDay,
      house: title,
      user: parsedDetails,
      amount: amount,
      totalDays: noOfDays,
      houseId,
    };

    try {
      await axios.post("/api/bookings", bookingDetails).then(() => {
        setOpen(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuccess = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <ClientLayout>
      {open ? (
        <div className="flex px-6 justify-center items-center bg-green-500 h-screen w-full z-10">
          <div className="flex flex-col rounded-2xl md:h-[500px] p-8 md:w-[700px] justify-between text-center bg-white space-y-4">
            <h1 className="text-xl md:text-4xl font-bold ">
              Congratulations Your Accomodation has been Booked Successfully
            </h1>

            <p className="text-6xl ">🥳</p>
            <p>You will receive an email shortly after payment is confirmed</p>
            <button
              onClick={handleSuccess}
              className="px-2 py-4 bg-green-700 text-white md:w-[200px] md:mx-auto"
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full bg-gray-200 -mt-2 px-4">
          <div className=" py-8  border-b-[0.8px] border-yellow-400">
            <Heading title="Booking Details" />
          </div>
          <div className="grid md:grid-cols-3">
            <div className="py-8  md:col-span-2 ">
              <div className="grid grid-cols-3 gap-y-8">
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    FirstName
                  </h4>
                  <p>{firstName}</p>
                </div>
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    LastName
                  </h4>
                  <p>{lastName}</p>
                </div>
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Contact
                  </h4>
                  <p>{contact}</p>
                </div>
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Email
                  </h4>
                  <p>{email}</p>
                </div>
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Address
                  </h4>
                  <p>{address}</p>
                </div>
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Nationality
                  </h4>
                  <p>{nationality}</p>
                </div>
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Special Requests
                  </h4>
                  <p>{specialRequest}</p>
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Arrival Time
                  </h4>
                  <p>{arrival}</p>
                </div>
              </div>

              <div className="mt-16 px-4 md:mr-28 ">
                <h4 className="text-2xl pb-2 text-green-800 font-extrabold text-center border-b-[0.8px] border-yellow-400 ">
                  Terms & Conditions
                </h4>
                <ul className="flex flex-col space-y-4  mt-4">
                  <li className="text-sm list-disc">
                    If you do not show up for your reservation and do not notify
                    us of a cancellation, you will be charged for the full
                    amount of the booking.
                  </li>
                  <li className="text-sm list-disc">
                    If you need to cancel your reservation, please do so at
                    least 48 hours before your scheduled arrival time to receive
                    a full refund. If you cancel within 48 hours of your
                    scheduled arrival time, your deposit will not be refunded.
                  </li>
                  <li className="text-sm list-disc">
                    All rates are quoted and charged in the local currency, and
                    currency exchange rates may apply if paying with a foreign
                    currency.
                  </li>
                  <li className="text-sm list-disc">
                    Please note that additional charges may apply for any extra
                    services or amenities requested during your stay.
                  </li>
                  <li className="text-sm list-disc">
                    A deposit of 50% of the total booking cost is required at
                    the time of booking to secure your reservation.
                  </li>
                  <li className="text-sm list-disc">
                    We accept payment by bank deposit and MPESA We do not accept
                    cash and personal checks.
                  </li>
                  <li className="text-sm list-disc">
                    Local taxes may be applied to your booking and will be
                    included in the total price.
                  </li>
                  <li className="text-sm list-disc">
                    The remaining balance of your booking must be paid upon
                    arrival at the hotel.
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center space-x-4">
                <input type="checkbox" className="" />
                <p className="text-lg font-extrabold ">
                  I acknowledge the payment terms and conditions.
                </p>
              </div>

              <div className="hidden md:inline-block mt-9">
                <h4 className="text-lg text-green-800  font-extrabold ">
                  Support
                </h4>
                <div className="mt-3 md:flex items-center md:space-x-20">
                  <div className="flex items-center space-x-3">
                    <p className="text-3xl">
                      <BsPhone />
                    </p>
                    <p>+245798024710</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="text-3xl">
                      <AiOutlineMail />
                    </p>
                    <p>silentpalmsvilla@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-8">
              <div>
                <div className="relative h-[280px] md:w-[350px] mx-auto">
                  <Image
                    src={parsedHouse.imageUrl}
                    fill
                    className="box object-cover"
                  />
                </div>
                <div className="my-6">
                  <p className="text-md text-green-800 font-extrabold text-center">
                    {title}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2  px-5 mb-2 w-[300px] mx-auto">
                  <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                    <p className="text-5xl text-white font-bold">{startDay}</p>
                    <p className="text-2xl text-white">{startMonth}</p>
                  </div>
                  <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                    <p className="text-5xl text-white font-bold">{endDay}</p>
                    <p className="text-2xl text-white">{endMonth}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 px-5 w-[300px] mx-auto">
                  <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                    <p className="text-5xl text-white font-bold">
                      <FaUsers />
                    </p>
                    <p className="text-2xl text-white">4 Guests</p>
                  </div>
                  <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                    <p className="text-5xl text-white font-bold">
                      <BsCashStack />
                    </p>
                    <p className="text-2xl text-white">{amount}</p>
                  </div>
                </div>
                <div className="my-6 w-[300px] mx-auto text-center">
                  <p className="px-4">
                    You are required to pay an initial deposit of KES{" "}
                    {amount / 2} or a full payment of KES {amount} via lia na
                    mpesa paybill no below then click confirm payment.
                  </p>
                  <div className="mt-6">
                    <p className="text-lg">TILL</p>
                    <p className="text-3xl font-bold">4098459</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-lg">ACCOUNT</p>
                    <p className="text-xl font-semibold">YOUR NAME</p>
                  </div>
                  <div className="my-7">
                    <button
                      onClick={handlePost}
                      className="px-4 py-3 bg-green-800 text-white border-none"
                    >
                      CONFIRM PAYMENT
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden ">
              <h4 className="text-lg text-green-800  font-extrabold ">
                Support
              </h4>
              <div className="mt-3 md:flex items-center md:space-x-20">
                <div className="flex items-center space-x-3">
                  <p className="text-3xl">
                    <BsPhone />
                  </p>
                  <p>+245798024710</p>
                </div>
                <div className="flex items-center mt-5 mb-16 space-x-3">
                  <p className="text-3xl">
                    <AiOutlineMail />
                  </p>
                  <p>silentpalmsvilla@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
};

export default Book;
