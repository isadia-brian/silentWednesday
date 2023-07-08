import Image from "next/image";
import Link from "next/link";

import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  HomeModernIcon,
  BanknotesIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineClose } from "react-icons/ai";
import { HiBars3BottomRight } from "react-icons/hi2";

import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Light.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const Links = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <HomeIcon />,
  },

  {
    title: "Bookings",
    link: "/admin/bookings",
    icon: <ClipboardDocumentCheckIcon />,
  },
  {
    title: "Messages",
    link: "/admin/messages",
    icon: <ClipboardDocumentCheckIcon />,
  },
  {
    title: "Houses",
    link: "/admin/houses",
    icon: <HomeModernIcon />,
  },
  {
    title: "Rates",
    link: "/admin/rates",
    icon: <BanknotesIcon />,
  },
  {
    title: "Calendar",
    link: "/admin/calendar",
    icon: <CalendarDaysIcon />,
  },
];

const AdminLayout = ({ children, open, setIsOpen }) => {
  return (
    <div className={`flex ${poppins.className}`}>
      {open && (
        <div
          className={`${poppins.className} pt-8 pb-4 px-4 absolute z-50 bg-green-700 h-screen w-full md:hidden`}
        >
          <div className="flex items-center justify-between md:hidden">
            <div className="h-24 w-24 rounded-full relative">
              <Image
                src="/images/logo.jpeg"
                fill
                alt="logo"
                className="rounded-full"
              />
            </div>
            <p
              className="text-4xl text-white font-bold"
              onClick={() => setIsOpen(!open)}
            >
              <AiOutlineClose />
            </p>
          </div>
          <ul className="uppercase text-white  pt-5 flex flex-col space-y-6 font-bold">
            {Links.map((link, index) => {
              return (
                <li key={index} className="" onClick={() => setIsOpen(!open)}>
                  <Link
                    href={link.link}
                    className="xs:text-xl text-[45px] flex items-center"
                  >
                    <span className="text-yellow-400 text-sm ">
                      <p className="h-[35px] w-[35px] mr-3">{link.icon}</p>
                    </span>
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <aside className="fixed z-10 py-8 h-screen bg-green-700 w-[200px] md:flex flex-col items-center text-center text-white hidden">
        <div className="relative rounded-full h-20 w-20 border border-green-800">
          <Image
            src="/images/logo.jpeg"
            fill
            alt="logo"
            className="rounded-full"
          />
        </div>
        <p className="mt-8 font-bold">ADMIN</p>
        <div className="mt-8">
          <nav>
            <ul className="cursor-pointer text-sm">
              {Links.slice(0, 1).map((link) => {
                return (
                  <li key={link.title}>
                    <Link href={link.link} className={`flex`}>
                      <span className="flex items-center space-x-4 w-full">
                        <p className="h-[20px] w-[20px] mr-1">{link.icon}</p>
                        {link.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="cursor-pointer mt-16 flex flex-col space-y-5">
              <p className="text-sm underline mb-2 shadow-lg">MANAGEMENT</p>
              {Links.slice(1, 6).map((link) => {
                return (
                  <li key={link.title}>
                    <Link href={link.link} className={`flex text-sm`}>
                      <span className="flex items-center space-x-4 w-full ">
                        <p className="h-[20px] w-[20px] mr-1 ">{link.icon}</p>
                        {link.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      <div className="md:ml-[200px] bg-gray-200  w-full">
        <div className=" flex items-center justify-between px-4 py-6 bg-green-700 md:hidden">
          <div className="h-24 w-24 rounded-full relative">
            <Image
              src="/images/logo.jpeg"
              fill
              alt="logo"
              className="rounded-full"
            />
          </div>
          <p
            className="text-4xl text-white font-bold"
            onClick={() => setIsOpen(!open)}
          >
            <HiBars3BottomRight />
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
