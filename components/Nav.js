import { useState } from "react";

import Link from "next/link";
import {
  HomeIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  HomeModernIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

const Links = [
  {
    title: "Dashboard",
    link: "/admin",
    icon: <HomeIcon />,
  },
  {
    title: "Users",
    link: "/admin/users",
    icon: <UsersIcon />,
  },
  {
    title: "Bookings",
    link: "/admin/getBookings",
    icon: <ClipboardDocumentCheckIcon />,
  },
  {
    title: "Houses",
    link: "/admin/getHouses",
    icon: <HomeModernIcon />,
  },
  {
    title: "Settings",
    link: "/admin/settings",
    icon: <CogIcon />,
  },
];

const Nav = ({ path }) => {
  const inActiveLink = "flex items-center space-x-4 uppercase";
  const activeLink =
    inActiveLink +
    " bg-white text-black rounded-l-full pl-4 py-3 transition duration-750";

  const match = Links.find((obj) => obj.link === path);

  const [active, setActive] = useState(match?.link);

  const handleLinkClick = (link) => {
    setActive(link);
  };
  return (
    <aside className="text-black min-w-[300px] p-8">
      <p className="text-black font-bold uppercase text-2xl mb-4 border-b-[0.8px] pb-4">
        Admin Panel
      </p>
      <nav>
        <ul className="flex flex-col font-bold h-[30vh] justify-between">
          {Links.map(({ title, link, icon }) => (
            <li key={title}>
              <Link
                href={link}
                className={`${
                  link === active ? activeLink : inActiveLink
                } cursor-pointer`}
                onClick={() => handleLinkClick(link)}
              >
                <span className="h-8 w-8">{icon}</span>
                <span>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Nav;
