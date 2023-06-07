import Image from "next/image";
import { Poppins, Karla } from "next/font/google";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";


const karla = Karla({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
  });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

export default function ClientLayout({ children }) {
  return (
    <div className={`${karla.className} text-[16px]`}>
      <div className="fixed top-0 w-full z-10 bg-white border-b-[1px] border-green-800 shadow-md">
        <Navbar />
      </div>
      

      <div className="relative mt-[110px]  h-full">{children}</div>

      <Footer />
    </div>
  );
}
