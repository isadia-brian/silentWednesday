import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "./AdminLayout";
import { TbHomePlus } from "react-icons/tb";

import HorizontalAccordion from "@/components/HorizontalAccordion";
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

const GetHouses = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        await axios.get(`/api/getHouses`).then((res) => {
          setHouses(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchHouses();
  }, []);
  return (
    <AdminLayout>
      <div
        className={`${poppins.className} py-14 pl-[230px] pr-[30px] bg-green-600 h-full w-screen -ml-[200px] `}
      >
        <div>
          <h1 className="font-bold underline">All Houses</h1>
        </div>
        <Link
          href="/admin/addhouse"
          className="bg-green-800 py-3 px-4 w-[150px] text-white border-none flex items-center justify-between"
        >
          Add House{" "}
          <span className="text-lg">
            <TbHomePlus />
          </span>
        </Link>
        <div>
          {houses.map((house) => {
            return (
              <div key={house._id} className="bg-white">
                <HorizontalAccordion
                  title={house.title}
                  description={house.description}
                  price={house.amount}
                  guests={house.noOfGuests}
                  rooms={house.rooms}
                  image={house.imageUrl}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

export default GetHouses;
