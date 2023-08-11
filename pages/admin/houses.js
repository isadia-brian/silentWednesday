import axios from "axios";
import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

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
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [noOfGuests, setnoOfGuests] = useState("");
  const [roomType, setRoomType] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
              const imageUrlObject = house.imageUrls[5];
              const imageUrlsMap = {};
              for (const label in imageUrlObject) {
                const url = imageUrlObject[label];
                imageUrlsMap[label] = url;
              }

              // Now you can use the imageUrlsMap to reference URLs using labels
              console.log(imageUrlsMap["Cover"]); // Prints the URL associated with the 'Cover' label
              console.log(imageUrlsMap["Kitchen"]);
              return (
                <div key={house._id} className="bg-white">
                  <HorizontalAccordion
                    title={house.title}
                    description={house.description}
                    price={house.amount}
                    guests={house.noOfGuests}
                    rooms={house.rooms}
                    image={house.imageUrls[0]}
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
