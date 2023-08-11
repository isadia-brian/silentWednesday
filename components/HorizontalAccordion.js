import { useState, useRef } from "react";
import Image from "next/image";
import { AiOutlineWifi } from "react-icons/ai";
import { FaSwimmingPool } from "react-icons/fa";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { Spin, notification } from "antd";

import {
  MdKitchen,
  MdKingBed,
  MdScreenshotMonitor,
  MdStarRate,
} from "react-icons/md";
import { HiUsers } from "react-icons/hi";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { Collapse } from "react-collapse";
import axios from "axios";

const HorizontalCard = ({ title, description, price, image, guests, id }) => {
  const inputRefs = {
    cover: useRef(),
    lounge: useRef(),
    kitchen: useRef(),
    bedroom: useRef(),
    balcony: useRef(),
    toilet: useRef(),
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState();
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);

  const [details, setDetails] = useState({
    houseName: title,
    guests: guests,
    description: description,
    amount: price,
    id: id,
  });

  const [api, contextHolder] = notification.useNotification();
  const successNotification = (message, description) => {
    api.open({
      message: <span className="text-white">{message}</span>,
      description: description,
      className: "custom-class",
      style: {
        width: 300,
        background: "green",
        color: "white",
      },
    });
  };
  const errorNotification = (message, description) => {
    api.open({
      message: <span className="text-white font-bold poppins">{message}</span>,
      description: description,
      className: "custom-class",
      style: {
        width: 300,
        background: "darkred",
        color: "white",
        fontWeight: 700,
      },
    });
  };

  const [open, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (event, label) => {
    const selectedImage = event.target.files[0];
    selectedImage.label = label;

    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      selectedImage,
    ]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!disabled) {
      setDisabled(true);
      setLoading(true);
      const cloudName = "isadia94";
      const uploadPreset = "silentpalms";

      if (selectedImages.length > 0) {
        const updatedUrls = [];

        for (const image of selectedImages) {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", uploadPreset);

          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            const label = image.label;

            const labelUrlObject = { [label]: data.secure_url };
            updatedUrls.push(labelUrlObject);
          } catch (error) {
            errorNotification("Error", "Error uploading Images");
            setLoading(false);
            setDisabled(false);
            setSelectedImages([]);
            for (const key in inputRefs) {
              inputRefs[key].current.value = ""; // Reset input value
            }

            return;
          }
        }

        try {
          const formDataWithImage = {
            details,
            imageUrls: updatedUrls,
          };

          console.log(formDataWithImage);

          await axios.put("/api/updateHouse/update", formDataWithImage);
          setLoading(false);
          setSuccess(true);
          setIsOpen(!open);
          successNotification(
            "Success",
            "Images and Houses updated successfully"
          );
          setTimeout(() => {
            setSuccess(false);
            setDisabled(false);
          }, 2000);
          setSelectedImages([]);
          for (const key in inputRefs) {
            inputRefs[key].current.value = ""; // Reset input value
          }
        } catch (error) {
          errorNotification("Error", "Error updating house");
          setLoading(false);
          setDisabled(false);
          setSelectedImages([]);
          for (const key in inputRefs) {
            inputRefs[key].current.value = ""; // Reset input value
          }
          return;
        }
      } else {
        try {
          const formDataWithoutImage = {
            details,
          };

          await axios.put("/api/updateHouse/update", formDataWithoutImage);
          setLoading(false);
          setSuccess(true);
          setIsOpen(!open);
          successNotification("Success", "House updated successfully");
          setTimeout(() => {
            setSuccess(false);
            setDisabled(false);
          }, 2000);
          setSelectedImages([]);
          for (const key in inputRefs) {
            inputRefs[key].current.value = ""; // Reset input value
          }
        } catch (error) {
          errorNotification(
            "Error",
            "An error occurred while updating this house"
          );
          setSelectedImages([]);
          setDisabled(false);
          setLoading(false);
          for (const key in inputRefs) {
            inputRefs[key].current.value = ""; // Reset input value
          }

          return;
        }
      }
    } else {
      return null;
    }
  };

  return (
    <>
      {contextHolder}
      <div className="h-full">
        <div className="mt-10 w-full">
          <div className="shadow-2xl px-4 py-4">
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0  ">
              <div className="relative h-[250px] md:h-[300px] md:min-w-[400px]">
                <Image src={image} alt={title} fill />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between w-full">
                    <h4 className=" text-lg md:text-2xl font-semibold ">
                      {title}
                    </h4>
                  </div>

                  <div className="flex space-x-1">
                    <p className="text-yellow-500">
                      <MdStarRate />
                    </p>
                    <p className="text-yellow-500">
                      <MdStarRate />
                    </p>
                    <p className="text-yellow-500">
                      <MdStarRate />
                    </p>
                    <p className="text-yellow-500">
                      <MdStarRate />
                    </p>
                    <p className="text-yellow-500">
                      <MdStarRate />
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <div className="flex space-x-2">
                      <p>
                        <HiUsers />
                      </p>
                      <p className="text-slate-500 text-xs">{guests}-Guests</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-[18px]  my-6 text-slate-500  ">
                    <AiOutlineWifi />
                    <FaSwimmingPool />
                    <MdKingBed />
                    <MdKitchen />
                    <MdScreenshotMonitor />
                  </div>
                </div>

                <p className="text-sm mb-6 line-clamp-4">{description}</p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-y-2 md:space-y-0">
                  <div>
                    <span className="text-sm  text-yellow-500">From</span>
                    <p className="text-3xl -mt-2 font-bold">
                      KES {price}
                      <span className="text-sm font-light"> per night</span>
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3  bg-green-800 text-white"
                    onClick={() => setIsOpen(true)}
                  >
                    EDIT HOUSE
                  </button>
                </div>
              </div>
            </div>
            <div>
              <Collapse isOpened={open}>
                <div className={open ? "active" : "inactive"}>
                  <div className="border-gray-400 border-t mt-16 pt-9">
                    <form className="">
                      <div className="flex items-center w-full justify-between">
                        <p className="font-bold">Edit House Details</p>
                        <p
                          className="text-3xl bg-red-500 rounded-full text-white cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <AiOutlineCloseCircle />
                        </p>
                      </div>

                      <div className="md:max-w-[700px]">
                        <div className="grid  gap-2 gap-y-8 mt-6">
                          <div className="flex flex-col">
                            <label>House Name</label>
                            <input
                              type="text"
                              name="houseName"
                              value={details.houseName}
                              className="border px-4 outline-none py-2 placeholder:text-[12px]"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label>Amount</label>
                            <input
                              type="text"
                              name="amount"
                              value={details.amount}
                              className="border px-4 outline-none py-2 placeholder:text-[12px]"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label>No Of Guests</label>
                            <input
                              type="number"
                              name="guests"
                              value={details.guests}
                              className="border px-4 outline-none py-2 placeholder:text-[12px]"
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="flex flex-col">
                            <label>House Description</label>
                            <textarea
                              type="text"
                              name="description"
                              value={details.description}
                              rows={5}
                              className="border px-4 outline-none py-2"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-8 w-[800px]">
                            <p className="font-bold mb-2">Images</p>
                            <div className="grid grid-cols-2 gap-y-6">
                              <div className="flex flex-col">
                                <label htmlFor="coverInput">Cover</label>
                                <input
                                  id="coverInput"
                                  ref={inputRefs.cover}
                                  type="file"
                                  onChange={(event) =>
                                    handleFileChange(event, "Cover")
                                  }
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="loungeInput">Lounge</label>
                                <input
                                  id="loungeInput"
                                  ref={inputRefs.lounge}
                                  type="file"
                                  onChange={(event) =>
                                    handleFileChange(event, "Lounge")
                                  }
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="kitchenInput">Kitchen</label>
                                <input
                                  id="kitchenInput"
                                  ref={inputRefs.kitchen}
                                  type="file"
                                  onChange={(event) =>
                                    handleFileChange(event, "Kitchen")
                                  }
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="bedroomInput">Bedroom</label>
                                <input
                                  id="bedroomInput"
                                  ref={inputRefs.bedroom}
                                  type="file"
                                  onChange={(event) =>
                                    handleFileChange(event, "Bedroom")
                                  }
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="balconyInput">Balcony</label>
                                <input
                                  id="balconyInput"
                                  ref={inputRefs.balcony}
                                  type="file"
                                  onChange={(event) =>
                                    handleFileChange(event, "Balcony")
                                  }
                                />
                              </div>
                              <div className="flex flex-col">
                                <label htmlFor="toiletInput">Toilet</label>
                                <input
                                  id="toiletInput"
                                  ref={inputRefs.toilet}
                                  type="file"
                                  onChange={(event) =>
                                    handleFileChange(event, "Toilet")
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className={`px-6 py-2 mb-8  w-[150px] h-[40px] rounded flex justify-center items-center ${
                            disabled
                              ? "bg-slate-500 cursor-not-allowed text-gray-300"
                              : "bg-green-800 cursor-pointer text-white"
                          }`}
                          onClick={(event) => handleFormSubmit(event)}
                        >
                          {loading ? (
                            <Spin />
                          ) : success ? (
                            <CheckCircleIcon className="h-7" />
                          ) : (
                            <>UPDATE</>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalCard;
