import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

import localFont from "next/font/local";
import axios from "axios";
import DataTable from "react-data-table-component";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const rates = () => {
  const [lowSeason, setLowSeason] = useState("");
  const [highSeason, setHighSeason] = useState("");
  const [christmasNewYear, setChristmasNewYear] = useState("");
  const [rates, setRates] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setIsOpen] = useState(false);

  const handleAction = (row) => {
    setEditedRow(row);
    setIsEditMode(true);
  };
  const handleSave = async (row) => {
    const id = row._id;
    // Update the data array with the edited values
    setRates((prevRates) => {
      return prevRates.map((row) => {
        if (row._id === editedRow._id) {
          return {
            ...row,
            lowSeason,
            highSeason,
            christmasNewYear,
            id,
          };
        }

        return row;
      });
    });

    await axios
      .put("/api/rates", { lowSeason, highSeason, christmasNewYear, id })
      .then((data) => {
        return data;
      });

    // Reset the state variables
    setEditedRow(null);
    setIsEditMode(false);
  };
  const columns = [
    {
      name: "House Name",
      selector: (row) => row.houseName,
      sortable: true,
      minWidth: "230px",
    },
    {
      name: "Low Season",
      selector: (row) => row.lowSeason,
      sortable: true,
      minWidth: "230px",

      cell: (row) =>
        isEditMode && editedRow?._id === row._id ? (
          <input
            type="text"
            value={lowSeason}
            onChange={(e) => setLowSeason(e.target.value)}
            className="border py-1 border-black px-1"
          />
        ) : (
          row.lowSeason
        ),
    },
    {
      name: "High Season",
      selector: (row) => row.highSeason,
      sortable: true,
      minWidth: "230px",
      cell: (row) =>
        isEditMode && editedRow?._id === row._id ? (
          <input
            type="text"
            value={highSeason}
            onChange={(e) => setHighSeason(e.target.value)}
            className="border py-1 border-black px-1"
          />
        ) : (
          row.highSeason
        ),
    },
    {
      name: "Christmas New Year",
      selector: (row) => row.christmasNewYear,
      sortable: true,
      minWidth: "230px",
      cell: (row) =>
        isEditMode && editedRow?._id === row._id ? (
          <input
            type="text"
            value={christmasNewYear}
            onChange={(e) => setChristmasNewYear(e.target.value)}
            className="border py-1 border-black px-1"
          />
        ) : (
          row.christmasNewYear
        ),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div>
            {isEditMode && editedRow?._id === row._id ? (
              <button
                className="text-blue-500 font-bold underline cursor-pointer"
                onClick={() => handleSave(row)}
              >
                Save
              </button>
            ) : (
              <button
                className="text-red-500 font-bold underline cursor-pointer"
                id={row._id}
                onClick={() => handleAction(row)}
              >
                Edit
              </button>
            )}
          </div>
        );
      },
      button: true,
    },
  ];

  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await axios.get("/api/rates");

        setRates(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRates();
  }, []);
  return (
    <div>
      <AdminLayout open={open} setIsOpen={setIsOpen} />
      {!open && (
        <div
          className={`${poppins.className} md:py-10 md:pl-[230px] md:pr-[30px] px-4 bg-gray-50 h-screen w-screen text-black shadow-xl`}
        >
          <div className="pt-6">
            <DataTable title="Rates" columns={columns} data={rates} />
          </div>
        </div>
      )}
    </div>
  );
};

export default rates;
