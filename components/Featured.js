import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Heading from "./Heading";

const melodrama = localFont({
  src: "../public/fonts/melodrama/Melodrama-Semibold.ttf",
});

const Featured = () => {
  return (
    <div className="h-full w-full mt-0">
      <div className="relative">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.9 }}
          className="text-center py-10 md:py-20"
        >
          <Heading title="Featured Villa" />
          <div className="bg-yellow-400 w-[50px] h-[3px] absolute left-1/2  bottom-16"></div>
        </motion.h1>

        
      </div>
      <div className="w-full grid grid-cols-1 px-4 md:grid-cols-2 bg-green-50 gap-12 text-center md:text-left">
        <div className="md:h-[500px] h-[50vh] w-full relative lg:w-full">
          <Image src="/images/img9.webp" alt="image" fill />
        </div>
        <div className="md:pt-12 ">
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <Heading title="2 Bedroom Executive Accomodation" smallHeader />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0.2, 0.3, 0.4, 0.6, 0.8, 1] }}
            transition={{ duration: 1, delay: 1 }}
            className=" max-w-[550px] my-8"
          >
            This luxury accommodation offers fully en-suite rooms, providing a private and comfortable space for guests. The rooms feature a spacious lounge with a coffee table, a coffee table allowing guests to enjoy a cup of coffee or tea while spending time together or relaxing. Guests can also enjoy their favorite shows or movies on the provided television set for entertainment. An additional cloakroom is available for added convenience.
          </motion.p>
          <p className="text-[12px] max-w-[350px] my-8">Max - 6 Guests</p>

          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 1 }}
            transition={{ duration: 0.9 }}
            className={`${melodrama.className} text-[30px] md:text-[30px]`}
          >
            KES 8,000 <span className="text-[16px]">/per night</span>
          </motion.p>

          <Link href="/reservation" className="mt-8 text-sm">
            Check Availability
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
