import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import {
  BsFillJournalBookmarkFill,
  BsFillBookmarkCheckFill,
  BsFillBookmarkDashFill,
  BsCashStack,
} from "react-icons/bs";
import axios from "axios";

import PieComponent from "@/components/PieComponent";
import DataTable from "react-data-table-component";
import { FaBell } from "react-icons/fa";

import localFont from "next/font/local";
import Link from "next/link";
import SimpleCharts from "@/components/SimpleCharts";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const DashBoard = () => {
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
  const [confirmedBookingsCount, setConfirmedBookingsCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [houseAmounts, setHouseAmounts] = useState([]);
  const [housePrices, setHousePrices] = useState([]);
  const [houseNames, setHouseNames] = useState([]);
  const [open, setIsOpen] = useState(false);

  const columns = [
    {
      name: "House",
      selector: (row) => row.house,
      sortable: true,
      minWidth: "180px",
    },

    {
      name: "Names",
      selector: (row) => `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      name: "Phone No.",
      selector: (row) => row.user.phoneNumber,
    },

    {
      name: "Total Days",
      selector: (row) => row.totalDays,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },
  ];

  const customStyles = {
    text: {
      style: {
        color: "green",
      },
    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
        backgroundColor: "rgb(255,255,255)",
        color: "black",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "rgb(44, 197, 44)",
        borderColor: "rgb(51,65,85)",
        color: "yellow",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  useEffect(() => {
    async function getAllBookings() {
      try {
        const response = await axios.get(`/api/getBookings`);

        setBookings(response.data);
        const pendingBookings = response.data.filter(
          (booking) => booking.bookingStatus === "pending"
        );
        setPendingBookingsCount(pendingBookings.length);

        const confirmedBookings = response.data.filter(
          (booking) => booking.bookingStatus === "Confirmed"
        );

        setConfirmedBookingsCount(confirmedBookings.length);

        // Calculate total amount
        const amountSum = confirmedBookings.reduce(
          (sum, booking) => sum + booking.amount,
          0
        );
        setTotalAmount(amountSum);

        // Calculate house-wise total amounts
        const houseTotals = {};
        confirmedBookings.forEach((booking) => {
          const { house, amount } = booking;

          if (houseTotals[house]) {
            houseTotals[house] += amount;
          } else {
            houseTotals[house] = amount;
          }
        });

        const totalAmountArrays = Object.values(houseTotals);

        const houseNamesArray = Object.keys(houseTotals);

        setHouseNames(houseNamesArray);
        setHousePrices(totalAmountArrays);

        // Convert houseTotals object into an array of objects
        const houseAmountsArray = Object.entries(houseTotals).map(
          ([house, amount]) => ({
            name: house,

            totalAmount: amount,
          })
        );

        const top3HouseAmounts = houseAmountsArray;

        setHouseAmounts(top3HouseAmounts);
      } catch (error) {
        console.log(error);
      }
    }

    getAllBookings();
  }, []);

  let formatter = new Intl.NumberFormat("en-us");

  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get("/api/getMessage");
        setMessages(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    }
    getMessages();
  }, []);
  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {!open && (
        <div
          className={`${poppins.className} pt-6 px-4 bg-gray-200 h-full w-full`}
        >
          <h5 className="text-xl font-bold text-black">DASHBOARD</h5>
          <p className={` text-black`}>Welcome to your DashBoard</p>
          <div className="mt-10">
            <div className="grid md:grid-cols-4 gap-4">
              <div className=" shadow-lg p-4 bg-white hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black ">
                <div className="flex items-center justify-between border-b-[0.8px] pb-8 pl-2">
                  <p className="text-4xl text-[#2cc52c] ">
                    <BsCashStack />
                  </p>
                  <div>
                    <p className="font-bold text-sm ">TOTAL EARNINGS</p>
                    <p className="text-2xl text-center">
                      KES {formatter.format(totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/admin/bookings"
                className="bg-white shadow-lg p-4 hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div className="flex items-center justify-between border-b-[0.8px] pb-8 pl-2">
                  <p className="text-4xl text-[#2cc52c]">
                    <BsFillJournalBookmarkFill />
                  </p>
                  <div>
                    <p className="font-bold text-sm">TOTAL BOOKINGS</p>
                    <p className="text-2xl text-center">{bookings?.length}</p>
                  </div>
                </div>
              </Link>
              <Link
                href="/admin/confirmedBookings"
                className="bg-white shadow-lg p-4 hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div className="flex items-center justify-between border-b-[0.8px] pb-8 pl-2">
                  <p className="text-4xl text-[#2cc52c]">
                    <BsFillBookmarkCheckFill />
                  </p>
                  <div>
                    <p className="font-bold text-sm">CONFIRMED BOOKINGS</p>
                    <p className="text-2xl text-center">
                      {confirmedBookingsCount}
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/admin/pendingBookings"
                className="bg-white shadow-lg  p-4 md:hover:scale-110 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out md:hover:bg-white md:hover:text-black text-center "
              >
                <div className="flex items-center justify-between border-b-[0.8px] pb-8 pl-2">
                  <p className="text-4xl text-[#2cc52c]">
                    <BsFillBookmarkDashFill />
                  </p>
                  <div>
                    <p className="font-bold text-sm">PENDING BOOKINGS</p>
                    <p className="text-2xl text-center">
                      {pendingBookingsCount}
                    </p>
                  </div>
                </div>
              </Link>
              <Link
                href="/admin/messages"
                className="bg-white md:hidden md:col-span-5 h-[200px] shadow-2xl relative hover:scale-105 text-white hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
              >
                <div>
                  <h3 className="text-center text-black  py-2 text-sm  uppercase font-bold">
                    MESSAGES
                  </h3>
                  <div className="absolute top-[30%] left-[35%] md:left-[40%]">
                    <p className="text-[100px] text-[green]">
                      <FaBell />
                    </p>
                  </div>

                  <div className="absolute top-[30%] left-[52%] bg-yellow-700 rounded-full h-10 w-10 flex items-center justify-center">
                    <p className="font-semibold text-lg">{messages.length}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="mt-4 grid-cols-1 grid md:grid-cols-12 gap-4">
            <div
              className="bg-white md:col-span-7
          h-full shadow-2xl"
            >
              <SimpleCharts />
            </div>
            <div className="bg-white md:col-span-5 h-[420px] shadow-2xl">
              <div className="">
                <h3 className=" text-slate-700 p-6 font-medium uppercase">
                  AGGREGATE REVENUE / ACCOMODATION
                </h3>
                <PieComponent
                  houseNamesArray={houseNames}
                  houseTotalsArray={housePrices}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="bg-white md:col-span-7 shadow-2xl  md:w-full">
              <h3 className="text-center text-black py-2 text-sm  uppercase font-bold">
                LAST FIVE BOOKINGS
              </h3>

              <div className="">
                <DataTable
                  columns={columns}
                  data={bookings.slice(0, 5)}
                  dense
                  customStyles={customStyles}
                />
              </div>
            </div>
            <Link
              href="/admin/messages"
              className="bg-white md:col-span-5 hidden md:block h-[240px] shadow-2xl relative hover:scale-105 text-black hover:shadow-2xl cursor-pointer transition duration-200 ease-in-out hover:bg-white hover:text-black "
            >
              <div>
                <h3 className="text-center  py-2 text-sm  uppercase font-bold">
                  MESSAGES
                </h3>
                <div className="absolute top-[30%] left-[35%] md:left-[40%]">
                  <p className="text-[100px] text-[green]">
                    <FaBell />
                  </p>
                </div>

                <div className="absolute top-[30%] left-[52%] bg-yellow-500 rounded-full h-10 w-10 flex items-center justify-center">
                  <p className="font-semibold text-lg">{messages.length}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default DashBoard;
