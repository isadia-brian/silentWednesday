
import { motion } from "framer-motion";
import { Cormorant } from "next/font/google";
import HeroSlider from "./HeroSlider";



const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});


const Hero = () => {
  return (
    <div className="w-full h-[50vh] md:h-[110vh] px-4 relative ">
    

    
      <HeroSlider/>
     
    </div>
  );
};

export default Hero;
