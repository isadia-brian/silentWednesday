import { useEffect, useState, useRef } from "react";
import { Spin, notification } from "antd";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Image, Transformation } from "cloudinary-react";
const Test = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const fileInputRef = useRef(null);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: "Success",
      description: "Images posted successfully",
      className: "custom-class",
      style: {
        width: 300,

        color: "green",
      },
    });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    const imagesArray = Array.from(files);
    setSelectedImages(imagesArray);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!disabled) {
      setDisabled(true);
      setLoading(true);
      const cloudName = "isadia94";
      const uploadPreset = "dulcet";

      const imageUrls = [];

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
          imageUrls.push(data.secure_url);
        } catch (error) {
          console.error("Error uploading data:", error);
        }
      }

      console.log("Uploaded images:", imageUrls);
      setLoading(false);
      setSuccess(true);
      openNotification();
    } else {
      console.log("cannot submit");
      return null;
    }
  };

  return (
    <div>
      {contextHolder}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <button className="bg-black text-white" onClick={handleUpload}>
        {loading ? <Spin /> : success ? <CheckCircleIcon /> : <p>Upload</p>}
      </button>
    </div>
  );
};

export default Test;
