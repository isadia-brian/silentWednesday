import { useState, useEffect } from "react";

import axios from "axios";
import AdminLayout from "./AdminLayout";
import DataTable from "react-data-table-component";

import localFont from "next/font/local";

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
      path: "../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const PendingBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [handleConfirmTriggered, setHandleConfirmTriggered] = useState(false);

  const columns = [
    {
      name: "Booking ID",
      selector: (row) => row._id,
      sortable: true,
      minWidth: "230px",
    },
    {
      name: "House",
      selector: (row) => row.house,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "House ID",
      selector: (row) => row.houseId,
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
      name: "Days",
      selector: (row) => row.totalDays,
      sortable: true,
      maxWidth: "10px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.fromDate,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.toDate,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
    },
    {
      name: "Booking Status",
      selector: (row) => row.bookingStatus,
    },
    {
      name: "Action",
      ignoreRowClick: true,
      cell: (row) => (
        <span
          className="text-green-500 font-bold underline cursor-pointer"
          onClick={() => handleConfirm(row)}
          id={row._id}
        >
          Approve
        </span>
      ),

      button: true,
      minWidth: "150px",
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
        backgroundColor: "rgb(51,65,85)",
        color: "white",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "rgb(51,65,85)",
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
    async function fetchBookings() {
      try {
        const response = await axios.get(`/api/getBookings`);

        const pendings = response.data;

        const filteredPending = pendings.filter(
          (pending) => pending.bookingStatus === "pending"
        );

        setBookings(filteredPending);
      } catch (error) {
        console.log(error);
      }
    }
    if (handleConfirmTriggered) {
      setHandleConfirmTriggered(false);
    }
    fetchBookings();
  }, [handleConfirmTriggered]);

  const handleConfirm = async (row) => {
    const bookingId = row._id;
    const houseId = row.houseId;
    try {
      // Make the API call to update the booking status
      const booking = await axios.put(`/api/allBookings/${bookingId}`);
      const house = await axios.get(`/api/updateHouse/confirmed?id=${houseId}`);
      const monthsArray = house.data.months;
      for (const month of monthsArray) {
        const monthId = month._id;

        try {
          const newBookingStatus = await axios.put(
            `/api/updateHouse/confirmed?id=${houseId}&monthId=${monthId}`
          );
        } catch (error) {
          console.log("Error updating booking status", error);
        }
      }
      // Set handleConfirmTriggered to true to trigger the useEffect
      setHandleConfirmTriggered(true);
      // Handle the response or perform any necessary actions
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div
        className={`${poppins.className} py-14 pl-[230px] pr-[30px] bg-green-600 h-screen w-screen -ml-[200px] `}
      >
        <div className="">
          <DataTable
            title={`Pending Bookings - ${bookings.length} Total`}
            columns={columns}
            data={bookings}
            pagination
            customStyles={customStyles}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default PendingBookings;
