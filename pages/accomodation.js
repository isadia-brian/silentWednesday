import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ClientLayout from "@/components/ClientLayout";
import { Cormorant } from "next/font/google";
import localFont from 'next/font/local'

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const poppins = localFont({src:"../public/fonts/poppins/Poppins-Medium.ttf"})



const Rooms = () => {
  return (
    <ClientLayout>

      <div className="px-4 h-full mb-20">
        <div  className={`${cormorant.className} text-[30px] md:text-[50px] md:text-center font-bold text-green-800`}>
          <h1>ROOMS & </h1>
          <h1 className="-mt-3 md:-mt-8">ACCOMODATIONS</h1>
        </div>
        <p className={`${cormorant.className} text-green-800 font-bold text-3xl mt-3 mb-2 md:hidden`}>2 bedroom Executive Villa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:my-16 w-full">
          <div className="h-[400px] w-full md:aspect-square md:h-[600px] md:w-full relative shadow-xl">
              <Image src="/images/img12.webp" alt="image" fill/>
          </div>

          <div className="h-[600px] md:w-[600px] flex flex-col justify-between ">
            <div className=" text-green-800">
              <h1 className={`${cormorant.className} text-[50px] font-normal hidden md:block`}>2 bedroom Executive Villa </h1>
            </div>
            <div className="grid">
              <div className="grid grid-cols-2 mt-2 md:mt-0 md:grid-cols-3 gap-1">
                <div className=" h-[150px] relative">
                <Image src="/images/img8.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/img7.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/loo2.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/img14.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] col-span-2 md:col-span-1 relative">
                <Image src="/images/bal1.webp" alt="image" fill/>
                </div>
                
               
               
              </div>
             
            </div>
            <div>
              <p className="text-[14px] mt-4 md:mt-0">This luxury accommodation features excellent finishes, including toilets and amenities. It boasts two fully ensuite bedrooms, each with its own toilet. The villa also includes an expansive lounge with an additional cloakroom, a coffee table, and a television. </p>
            </div>
            <div>
              <Link className="text-yellow-700 text-sm border-b-2 pb-[2px] my-8 border-yellow-700" href="/">LEARN MORE</Link>
            </div>
            <button className="text-white bg-green-800 px-2 py-2 w-[130px] mt-4 md:mt-0">BOOK NOW</button>
          </div>
        </div>
        <p className={`${cormorant.className} text-green-800 font-bold text-3xl mt-24 mb-2 md:hidden`}>2 bedroom Standard Villa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:my-16 w-full">
          <div className="h-[400px] w-full md:aspect-square md:h-[600px] md:w-full relative shadow-xl">
          <Image src="/images/2bed1.webp" alt="image" fill/>
          </div>

          <div className="md:h-[600px] md:w-[600px] flex flex-col justify-between ">
            <div className=" text-green-800">
              <h1 className={`${cormorant.className} text-[50px] font-normal hidden md:block`}>2 bedroom Standard Villa</h1>
            </div>
            <div className="grid">
              <div className="grid grid-cols-2 mt-2 md:mt-0 md:grid-cols-3 gap-1">
              <div className=" h-[150px] relative">
                <Image src="/images/open.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/open2.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/loo3.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/2bed2.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] col-span-2 md:col-span-1 relative">
                <Image src="/images/bal4.webp" alt="image" fill/>
                </div>
                
                
               
               
              </div>
             
            </div>
            <div>
              <p className="text-[14px] mt-4 md:mt-0">This luxurious studio apartment boasts an open-plan living room featuring a cozy lounge area, an open kitchen, and a dining area in a compact and stylish design. The open-plan concept creates a spacious and airy feel, perfect for those who prefer a more modern and minimalistic living space. </p>
            </div>
            <div>
              <Link className="text-yellow-700 text-sm border-b-2 pb-[2px] my-8 border-yellow-700" href="/">LEARN MORE</Link>
            </div>
            <button className="text-white bg-green-800 px-2 py-2 w-[130px] mt-4 md:mt-0">BOOK NOW</button>
          </div>
        </div>
        
        <p className={`${cormorant.className} text-green-800 font-bold text-3xl mt-12 mb-2 md:hidden`}>1 bedroom Villa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:my-16 w-full">
          <div className="h-[400px] w-full md:aspect-square md:h-[600px] md:w-full relative shadow-xl">
          <Image src="/images/2bed.webp" alt="image" fill/>
          </div>

          <div className="md:h-[600px] md:w-[600px] flex flex-col justify-between ">
            <div className=" text-green-800">
              <h1 className={`${cormorant.className} text-[50px] font-normal hidden md:block`}>1 bedroom Villa</h1>
            </div>
            <div className="grid">
              <div className="grid grid-cols-2 mt-2 md:mt-0 md:grid-cols-3 gap-1">
              <div className=" h-[150px] relative">
                <Image src="/images/open3.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/1bed2.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/loo2.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/2bed.webp" alt="image" fill/>
                </div>
                <div className="h-[150px] relative">
                <Image src="/images/bal1.webp" alt="image" fill/>
                </div>
                
                
               
               
              </div>
             
            </div>
            <div>
              <p className="text-[14px] mt-4 md:mt-0">This villa comprises of elegant finishes with the following amenities, executive lounge with a coffee table and a TV, WIFI with high-speed internet connection. There is also an open plan kitchen fully equipped with kitchen amenities that include a cooker with gas, fridge, microwave and coffee maker and a wooden dining that accommodates 4 pax.</p>
            </div>
            <div>
              <Link className="text-yellow-700 text-sm border-b-2 pb-[2px] my-8 border-yellow-700" href="/">LEARN MORE</Link>
            </div>
            <button className="text-white bg-green-800 px-2 py-2 w-[130px] mt-4 md:mt-0">BOOK NOW</button>
          </div>
        </div>
        
      </div>

    </ClientLayout>
    
  );
};

export default Rooms;
