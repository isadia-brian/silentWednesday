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
      <div className="md:ml-[200px] w-full">{children}</div>
    </div>
  );
};

export default AdminLayout;
