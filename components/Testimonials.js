import localFont from "next/font/local";
import Image from "next/image";
import { motion } from "framer-motion";
import {FaQuoteLeft} from 'react-icons/fa'
import Heading from "./Heading";
const melodrama = localFont({
  src: "../public/fonts/melodrama/Melodrama-Semibold.ttf",
});



const Testimonials = () => {
  return (<div className="w-full h-full mb-20 relative px-4">
  <div className="relative">
  <motion.h1
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 1 }}
      transition={{ duration: 0.9 }}
      className="text-center py-10 md:py-20"
    >
      <Heading title="Testimonials" />
      <div className="bg-yellow-400 w-[50px] h-[3px] absolute left-1/2  bottom-16"></div>
    </motion.h1>
    <p></p>
  </div>
      <div className="grid md:grid-cols-3 md:gap-4 ">
      <div className="mb-5 md:mb-20  bg-green-700 p-4">
        <div className="md:h-[80px] h-[100px]  w-[100px] md:w-[80px] mx-auto relative rounded-full ">
          <Image src="/images/girl.jpg" alt="img" fill className="rounded-full object-cover "/>
        </div>
        <div className=" w-full md:-mt-0">
        <p className={`${melodrama.className}flex justify-between w-full text-yellow-400 text-xs`}>
            <FaQuoteLeft/>
        </p>
        <p className=" text-white">We had a wonderful stay everything was superb 👌 Many thanks to Mr mwarabu and miss faith who made sure we were comfortable and we had Activities to do during our stay. We will definitely come back..</p>
        <div className="w-full flex justify-between">
            <p className="font-bold mt-2 text-yellow-400">Grace</p>
        </div>
        </div>
       
    </div>
    <div className="mb-5 md:mb-20 bg-green-700 p-4">
        <div className="md:h-[80px] h-[100px]  w-[100px] md:w-[80px] mx-auto relative rounded-full">
          <Image src="/images/david.jpg" alt="img" fill className="rounded-full object-cover"/>
        </div>
        <div className=" w-full  md:-mt-0">
        <p className={`${melodrama.className}flex justify-between w-full text-yellow-400 text-xs`}>
            <FaQuoteLeft/>
        </p>
        <p className=" text-white">My wife & I had an incredible experience during our stay at silent palms Everything surpassed our expectations. A big shoutout to the host for their exceptional hospitality and ensuring our comfort.We are already planning our return.</p>
        <div className="w-full flex justify-between">
            <p className="font-bold mt-2 text-yellow-400">David</p>
        </div>
        </div>
       
    </div>
    <div className="mb-20  bg-green-700 p-4">
        <div className="md:h-[80px] h-[100px]  w-[100px] md:w-[80px] mx-auto relative rounded-full ">
          <Image src="/images/pamela.jpg" alt="img" fill className="rounded-full object-cover "/>
        </div>
        <div className=" w-full md:-mt-0">
        <p className={`${melodrama.className}flex justify-between w-full text-yellow-400 text-xs `}>
            <FaQuoteLeft/>
        </p>
        <p className="text-white ">Our family had an unforgettable time here. It was a perfect retreat for us, with something for everyone to enjoy. The villa provided endless entertainment options, creating beautiful memories that will be cherished forever.</p>
        <div className="w-full flex justify-between">
            <p className="font-bold mt-2 text-yellow-400">Pamela</p>
        </div>
        </div>
       
    </div>
      </div>
    
  </div>
  )
};

export default Testimonials;
