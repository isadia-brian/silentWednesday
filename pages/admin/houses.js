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
  const [open, setIsOpen] = useState(false);

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
  }, [houses]);
  return (
    <AdminLayout open={open} setIsOpen={setIsOpen}>
      {!open && (
        <div
          className={`${poppins.className} md:py-14 md:pl-[230px] md:pr-[30px] py-6 px-4 bg-gray-50 h-full w-screen md:-ml-[200px] `}
        >
          <div>
            <h1 className="font-bold text-xl  uppercase">Houses</h1>
          </div>

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
                    id={house._id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default GetHouses;
