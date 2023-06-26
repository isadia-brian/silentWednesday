import Image from "next/image";
import Link from "next/link";
import { MdTimeline } from "react-icons/md";
import { AiFillPieChart } from "react-icons/ai";
import { HiChartPie } from "react-icons/hi";

import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  HomeModernIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

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
    link: "/admin/getBookings",
    icon: <ClipboardDocumentCheckIcon />,
  },
  {
    title: "Messages",
    link: "/admin/",
    icon: <ClipboardDocumentCheckIcon />,
  },
  {
    title: "Houses",
    link: "/admin/getHouses",
    icon: <HomeModernIcon />,
  },
  {
    title: "Pie Chart",
    link: "/admin/getHouses",
    icon: <HiChartPie />,
  },
  {
    title: "Line Chart",
    link: "/admin/getHouses",
    icon: <MdTimeline />,
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div className={`flex ${poppins.className}`}>
      <aside className="fixed z-10 py-8 h-screen bg-green-700 w-[200px] flex flex-col items-center text-center text-white">
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
              {Links.slice(1, 4).map((link) => {
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
      <div className="ml-[200px]">{children}</div>
    </div>
  );
};

export default AdminLayout;
