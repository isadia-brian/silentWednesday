import axios from "axios"
import { useEffect, useState } from "react"
import Link from 'next/link'
import AdminLayout from "@/components/AdminLayout"
import {TbHomePlus} from 'react-icons/tb'

import HorizontalAccordion from "@/components/HorizontalAccordion"

const GetHouses = () => {

    const [houses, setHouses] = useState([])

    useEffect(()=>{

      const fetchHouses = async ()=>{
        try {
         await axios.get(`/api/getHouses`).then((res)=>{
            setHouses(res.data)
           
  
        })
        } catch (error) {
          console.log(error);
        }
      }

      fetchHouses()

     
        
    },[])
  return (
    <AdminLayout>
     

      <div className=" -mt-3 flex items-center justify-between w-full">
        <div>
        <h1 className="font-bold underline">All Houses</h1>
        </div>
        <Link href="/admin/addhouse" className="bg-green-800 py-3 px-4 w-[150px] text-white border-none flex items-center justify-between">Add House <span className="text-lg"><TbHomePlus/></span></Link>
      </div>

      <div>
        {houses.map((house)=>{
            return (
               <div key={house._id}>
                <HorizontalAccordion title={house.title} description={house.description} price={house.amount} guests={house.noOfGuests} rooms={house.rooms} image={house.imageUrl} />
               </div>
                    )
                    
                    })}
        
      </div>
    </AdminLayout>
  )
}

export default GetHouses
