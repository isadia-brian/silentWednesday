import axios from "axios";
import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";




const AddHouse = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [image, setImage] = useState(null);
  const [roomType, setRoomType]=useState("")

 



  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  

  const handleSubmit =  async (e)=>{
    e.preventDefault();

   

    const formData = new FormData();
    formData.append("file",image)
    formData.append("upload_preset","silentpalms")

    const uploadResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/isadia94/image/upload",
      formData
    );

    const imageUrl = uploadResponse.data.secure_url;

    

    axios.post(`/api/addHouse`,{title,amount,description,noOfGuests,imageUrl,roomType}).then((res) => {
      console.log(res);
      setTitle("");
      setDescription("");
      setAmount("");
      setNoOfGuests("");
      setRoomType("");
      setImage(null);
      
    
    }).catch(err=>console.error(err))

  }
  return (
    <AdminLayout>
      <div className="max-w-[500px]">
      <div>
        <h2 className="font-bold">Add House</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col mt-4">
            <label>Title:</label>
          <input type="text" className="border border-slate-400 py-2 outline-none px-3" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col mt-4">
            <label>Amount:</label>
          <input type="text" className="border border-slate-400 py-2 outline-none px-3" value={amount} onChange={(e)=>setAmount(e.target.value)} />
          </div>
          <div className="flex flex-col mt-4 col-span-2">
            <label>No of guests:</label>
          <input type="text" className="border border-slate-400 py-2 outline-none px-3" value={noOfGuests} onChange={(e)=>setNoOfGuests(e.target.value)} />
          </div>
          <div className="flex flex-col mt-4 col-span-2">
            <label>Description:</label>
          <textarea type="text" className="border border-slate-400 py-2 outline-none px-3" value={description} onChange={(e)=>setDescription(e.target.value)} />
          </div>
          <div className="flex flex-col mt-4 col-span-2">
          <label>Room Type:</label>
          <select className="outline-none border border-slate-400 py-2 px-3" value={roomType} onChange={(e)=>setRoomType(e.target.value)}>
          <option value="">Select Accomodation</option>
                  <option value="Executive">Executive</option>
                  <option value="Standard">Standard</option>
                  <option value="Studio">Studio</option>
                </select>
          </div>
          <div className="flex flex-col mt-4 col-span-2">
  <label>Image:</label>
  <input type="file" onChange={handleImageChange} />
</div>

          <div className="flex flex-col mt-4 col-span-2">
          
          <button type="submit" className="border bg-green-900 text-white uppercase border-slate-400 py-4 outline-none px-3">Submit</button>
          </div>
          
          
        </form>
      </div>
    </div>
    </AdminLayout>
    
  )
}

export default AddHouse
