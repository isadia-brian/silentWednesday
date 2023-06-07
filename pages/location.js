import localFont from "next/font/local";
import Image from "next/image";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";



const melodrama = localFont({
  src: "../public/fonts/melodrama/Melodrama-Semibold.ttf",
});

const Map = dynamic(() => import("/components/Map"), { ssr: false });

import ClientLayout from "@/components/ClientLayout";

const Location = () => {
  return (
    <ClientLayout>
      <div className="h-fit flex my-12 justify-between ">
        <div className="relative w-fit p-12 max-w-[550px] mt-12 ">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 1 }}
            transition={{ duration: 0.9 }}
            className={`${melodrama.className} md:text-[50px] `}
          >
            Location
          </motion.h1>
          <div className="bg-green-800 h-2 w-12 "></div>
          <p className="mt-8">We are located along Diani Beach Road a few Kilometres from Ukunda Shopping Centre (Mwisho Wa Lami)</p>

          <div>
            <h4 className={`${melodrama.className} md:text-[30px] mt-12 underline `}>Nearby Places & Activities</h4>

            <ul className="mt-4 text-gray-800 text-sm space-y-3">
                <li className="list-disc">Shopping Centers & Malls including Naivas Carrefour e.t.c</li>
                <li className="list-disc">Beach Life with access to port drive</li>
                <li className="list-disc">Fun Activities such as Jetski rides, deepsea diving, dolphin view, Kayaking and many more.</li>
                <li className="list-disc">Explore the Mysterious waterfall caves</li>
                <li className="list-disc">Access to Ukunda Airstrip & Moi International Airport</li>
                <li className="list-disc">Tsavo National Park & Simba Hills</li>
            </ul>
          </div>
        </div>
        <div className="w-1/2">
        <Map/>
        </div>
     
      </div>
    </ClientLayout>
  );
};

export default Location;
