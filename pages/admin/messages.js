import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

import axios from "axios";

import DataTable from "react-data-table-component";

import localFont from "next/font/local";
import Link from "next/link";

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

const DashBoard = () => {
  const [messages, setMessages] = useState([]);
  const [open, setIsOpen] = useState(false);
  const ExpandableComponent = ({ data }) => (
    <div className="p-4 ">
      <p className="font-bold mb-4 text-lg">Message:</p>

      <p className="text-sm max-w-[300px] md:max-w-full">{data.user_message}</p>
    </div>
  );
  const columns = [
    {
      name: "user",
      selector: (row) => row.user_name,
    },

    {
      name: "email",
      selector: (row) => row.user_email,
    },
    {
      name: "Phone No.",
      selector: (row) => row.user_phone,
    },

    {
      name: "Messages",
      selector: (row) => row.user_message,
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

        color: "black",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",

        borderColor: "rgb(51,65,85)",
        color: "black",
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
    async function getMessages() {
      try {
        const response = await axios.get("/api/getMessage");
        setMessages(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    }
    getMessages();
  });
  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {!open && (
        <div
          className={`${poppins.className} md:py-14 md:pl-[230px] md:pr-[30px] px-4 py-6 bg-gray-200 h-screen w-screen md:-ml-[200px] `}
        >
          <DataTable
            title="Messages"
            columns={columns}
            data={messages}
            customStyles={customStyles}
            expandableRows
            pagination
            expandableRowsComponent={ExpandableComponent}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default DashBoard;
