import Image from "next/image";
import { motion } from "framer-motion";
import ClientLayout from "@/components/ClientLayout";
import { Cormorant } from "next/font/google";



const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Gallery = () => {
  return (
  

      <ClientLayout>
        <div className="px-4 mb-24 h-full">
        <div  className={`${cormorant.className} text-[50px] text-center my-12 font-bold text-green-800`}>
          <h1>GALLERY</h1>
     
        </div>
<div className="grid md:grid-cols-3 gap-2">
        <div className="relative h-[300px] w-full">
          <Image src="/images/hero.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img1.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img2.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img3.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img4.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img5.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img6.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img7.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img8.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img9.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img10.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img11.webp" alt="image" fill />
        </div>
        <div className="relative h-[300px] w-full">
          <Image src="/images/img12.webp" alt="image" fill />
        </div>
      </div>
        </div>
      
 
      </ClientLayout>
     
  
   
     
  
   
  );
};

export default Gallery;
