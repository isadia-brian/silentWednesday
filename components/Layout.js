import Image from "next/image";
import { Inter } from "next/font/google";

// import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";

import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  // const { data: session } = useSession();

  const router = useRouter();

  return (

      <main className="w-screen h-screen bg-green-500  flex">
        <Nav path={router.pathname} />
        <div className="w-full text-black bg-white flex-grow mt-2 mr-2 rounded-md mb-2 p-8">
<p>{children}</p>
        </div>
      </main>

  );
}
