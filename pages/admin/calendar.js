import { useEffect, useState } from "react";
import { Badge, Calendar } from "antd";
import AdminLayout from "./AdminLayout";
import localFont from "next/font/local";
import { parse, format, eachDayOfInterval } from "date-fns";
import axios from "axios";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const CalendarComponent = () => {
  const [bookingData, setBookingData] = useState([]);

  const getMonthData = (value) => {};

  const getDatesBetween = (fromDate, toDate) => {
    const parsedFromDate = parse(fromDate, "dd-MM-yyyy", new Date());
    const parsedToDate = parse(toDate, "dd-MM-yyyy", new Date());
    return eachDayOfInterval({ start: parsedFromDate, end: parsedToDate });
  };

  const getListData = (value) => {
    const selectedDate = value.toDate();
    const selectedDateWithoutTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    let listData = [];

    bookingData.forEach((booking) => {
      const datesBetween = getDatesBetween(booking.fromDate, booking.toDate);
      if (
        datesBetween.some(
          (date) => date.getTime() === selectedDateWithoutTime.getTime()
        )
      ) {
        const houseWords = booking.house.split(" ");
        const houseName =
          houseWords[2] + " " + houseWords[houseWords.length - 1].slice(-2);
        listData.push({
          type: "success",
          content: houseName,
        });
      }
    });

    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);

    return info.originNode;
  };

  useEffect(() => {
    const getBookings = async () => {
      try {
        const response = await axios.get("/api/getBookings");

        setBookingData(response.data);
      } catch (error) {
        console.log(error, "Error getting files");
      }
    };
    getBookings();
  }, []);

  return (
    <AdminLayout>
      <div className="px-6 bg-green-600 h-screen">
        <h1
          className={`${poppins.className} pt-14 w-full text-xl font-bold underline text-white `}
        >
          Bookings Calendar
        </h1>
        <div className={`${poppins.className} py-5 w-full `}>
          <Calendar cellRender={cellRender} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CalendarComponent;
