import { useRef } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import ClientLayout from "@/components/ClientLayout";

import { Cormorant } from "next/font/google";
import dynamic from "next/dynamic";


const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const melodrama = localFont({
  src: "../public/fonts/melodrama/Melodrama-Semibold.ttf",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

const Map = dynamic(() => import("/components/Map"), { ssr: false });

const handleSubmit =(e)=>{
e.preventDefault();

}

const Contact = () => {
  const nameRef = useRef();
  const phoneRef = useRef();
  const messageRef = useRef()
  return (
    <ClientLayout>
      <div className="h-full md:h-full w-full mb-32 px-4">
      <div  className={`${cormorant.className} text-[50px] my-12 text-center font-bold text-green-800`}>
      <h1>GET </h1>
          <h1 className="-mt-8">IN TOUCH</h1>
     
        </div>
        <div className="mt-8">
        <h2 className={`${cormorant.className} text-yellow-700 text-[25px]`}>Contact Us</h2>
        <div className="flex flex-col md:flex-row space-x-4 justify-between">
        <form className="mt-4 md:w-1/2" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col">
              <label>Name</label>
              <input type="text" ref={nameRef} className="outline-none border border-slate-400 px-2 py-4" />
            </div>
            <div className="flex flex-col">
              <label>Phone Number</label>
              <input type="text" ref={phoneRef} className="outline-none border border-slate-400 px-2 py-4" />
            </div>
            <div className="flex flex-col">
              <label>Message</label>
              <textarea type="text" ref={messageRef} className="outline-none border border-slate-400 px-2 py-4" />
            </div>
            <input type="button" value="Send" className="bg-green-800 text-white py-4" />
          </div>
        </form>
        <div className=" mt-6 md:w-1/2 md:mt-0">
        <Map/>
        </div>
        
        </div>
        
        </div>
        
      </div>
    </ClientLayout>
     
      
 
   
  );
};



export default Contact;
