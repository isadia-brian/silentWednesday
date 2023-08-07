import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { values, fromDate, toDate, guests } = router.query;

  const fromDay = moment(fromDate, "DD-MM-YYYY").format("DD");
  const fromThisDay = moment(fromDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  const fromMonth = moment(fromDate, "DD-MM-YYYY").format("MMM").toUpperCase();
  const toDay = moment(toDate, "DD-MM-YYYY").format("DD");
  const toThisDay = moment(toDate, "DD-MM-YYYY").format("DD-MM-YYYY");
  const toMonth = moment(toDate, "DD-MM-YYYY").format("MMM").toUpperCase();
  const noOfDays = Number(toDay) - Number(fromDay) + 1;

  // Parse the JSON string back to objects

  const parsedValues = values ? JSON.parse(values) : {};
  console.log(parsedValues.houseImage);

  const amountTotal = parsedValues.houseAmount * noOfDays;
  const userDetails = {
    firstName: parsedValues.firstName,
    lastName: parsedValues.lastName,
    phoneNumber: parsedValues.phoneNumber,
    email: parsedValues.email,
    arrival: parsedValues.arrival,
    address: parsedValues.address,
    nationality: parsedValues.nationality,
  };

  const handlePost = async () => {
    const bookingDetails = {
      fromDate: fromThisDay,
      toDate: toThisDay,
      user: userDetails,
      amount: amountTotal,
      totalDays: noOfDays,
      houseId: parsedValues.houseId,
      house: parsedValues.houseTitle,
      guests: guests,
    };

    try {
      await axios.post("/api/bookings", bookingDetails).then(() => {
        setOpen(true);
      });
    } catch (error) {
      console.error(error);
    }
  };
  let formatter = new Intl.NumberFormat("en-us");

  const handleSuccess = (e) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <>
      {open ? (
        <div className="absolute  bg-green-500 h-screen top-0 left-0 w-full z-[1500] ">
          <div className="flex flex-col rounded-2xl mx-4 md:mx-0 md:h-[500px] p-5 md:p-8 md:w-[700px] md:justify-between text-center bg-white space-y-8 md:space-y-4 absolute top-1/2 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2">
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
        <ClientLayout open={open}>
          <div className="h-full  -mt-2 px-4">
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
                    <p>{parsedValues.firstName}</p>
                  </div>
                  <div>
                    <h4 className="text-lg text-green-800 font-extrabold">
                      LastName
                    </h4>
                    <p>{parsedValues.lastName}</p>
                  </div>
                  <div>
                    <h4 className="text-lg text-green-800 font-extrabold">
                      Contact
                    </h4>
                    <p>{parsedValues.phoneNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-lg text-green-800 font-extrabold">
                      Arrival Time
                    </h4>
                    <p>{parsedValues.arrival}</p>
                  </div>

                  <div>
                    <h4 className="text-lg text-green-800 font-extrabold">
                      Address
                    </h4>
                    <p>{parsedValues.address}</p>
                  </div>
                  <div>
                    <h4 className="text-lg text-green-800 font-extrabold">
                      Nationality
                    </h4>
                    <p>{parsedValues.nationality}</p>
                  </div>
                  <div>
                    <h4 className="text-lg text-green-800 font-extrabold">
                      Special Requests
                    </h4>
                    <p>{parsedValues.request}</p>
                  </div>
                </div>
                <div className="mt-12">
                  <h4 className="text-lg text-green-800 font-extrabold">
                    Email
                  </h4>
                  <p>{parsedValues.email}</p>
                </div>

                <div className="mt-16 px-4 md:mr-28 ">
                  <h4 className="text-2xl pb-2 text-green-800 font-extrabold text-center border-b-[0.8px] border-yellow-400 ">
                    Terms & Conditions
                  </h4>
                  <ul className="flex flex-col space-y-4  mt-4">
                    <li className="text-sm list-disc">
                      If you do not show up for your reservation and do not
                      notify us of a cancellation, you will be charged for the
                      full amount of the booking.
                    </li>
                    <li className="text-sm list-disc">
                      If you need to cancel your reservation, please do so at
                      least 48 hours before your scheduled arrival time to
                      receive a full refund. If you cancel within 48 hours of
                      your scheduled arrival time, your deposit will not be
                      refunded.
                    </li>
                    <li className="text-sm list-disc">
                      All rates are quoted and charged in the local currency,
                      and currency exchange rates may apply if paying with a
                      foreign currency.
                    </li>
                    <li className="text-sm list-disc">
                      Please note that additional charges may apply for any
                      extra services or amenities requested during your stay.
                    </li>
                    <li className="text-sm list-disc">
                      A deposit of 50% of the total booking cost is required at
                      the time of booking to secure your reservation.
                    </li>
                    <li className="text-sm list-disc">
                      We accept payment by bank deposit and MPESA We do not
                      accept cash and personal checks.
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
                      src={parsedValues.houseImage}
                      fill
                      alt={parsedValues.houseTitle}
                      className="box object-cover"
                    />
                  </div>
                  <div className="my-6">
                    <p className="text-md text-green-800 font-extrabold text-center">
                      {parsedValues.houseTitle}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2  px-5 mb-2 w-[300px] mx-auto">
                    <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                      <p className="text-5xl text-white font-bold">{fromDay}</p>
                      <p className="text-2xl text-white">{fromMonth}</p>
                    </div>
                    <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                      <p className="text-5xl text-white font-bold">{toDay}</p>
                      <p className="text-2xl text-white">{toMonth}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-5 w-[300px] mx-auto">
                    <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                      <p className="text-5xl text-white font-bold">
                        <FaUsers />
                      </p>
                      <p className="text-2xl text-white">{guests}</p>
                    </div>
                    <div className="bg-green-400 h-[100px] flex justify-center items-center flex-col">
                      <p className="text-5xl text-white font-bold">
                        <BsCashStack />
                      </p>
                      <p className="text-2xl text-white">
                        <span className="text-lg">KES </span>
                        {formatter.format(amountTotal)}
                      </p>
                    </div>
                  </div>
                  <div className="my-6 w-[300px] mx-auto text-center">
                    <p className="px-4">
                      You are required to pay an initial deposit of KES{" "}
                      {formatter.format(amountTotal / 2)} or a full payment of
                      KES {formatter.format(amountTotal)} via lia na mpesa
                      paybill no below then click confirm payment.
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
                  <div className="flex items-center mt-3 mb-16 space-x-3">
                    <p className="text-3xl">
                      <AiOutlineMail />
                    </p>
                    <p>silentpalmsvilla@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ClientLayout>
      )}
    </>
  );
};

export default Book;
