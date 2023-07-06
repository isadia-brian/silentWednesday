import Image from "next/image";
import Link from "next/link";

import ClientLayout from "@/components/ClientLayout";
import { Cormorant } from "next/font/google";
import localFont from "next/font/local";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const poppins = localFont({
  src: "../public/fonts/poppins/Poppins-Medium.ttf",
});

const Rooms = () => {
  return (
    <ClientLayout>
      <div className="px-4 h-full mb-20">
        <div
          className={`${cormorant.className} text-[30px] text-center md:text-left md:text-[40px]  pt-4 font-bold text-green-800 my-12`}
        >
          <h1>ROOMS &</h1>
          <h1 className="-mt-2 md:-mt-5"> ACCOMODATIONS</h1>
        </div>
        <p
          className={`${cormorant.className} text-green-800 font-bold text-3xl mt-3 mb-2 md:hidden`}
        >
          2 Bedroom Executive Villa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:my-16 w-full">
          <div className="h-[400px] w-full md:aspect-square md:h-[600px] md:w-full relative shadow-xl">
            <Image src="/images/img12.webp" alt="image" fill />
          </div>

          <div className="h-[600px] md:w-[600px] flex flex-col justify-between ">
            <div className=" text-green-800">
              <h1
                className={`${cormorant.className} text-[50px] font-normal hidden md:block`}
              >
                2 Bedroom Executive Villa
              </h1>
            </div>
            <div className="grid">
              <div className="grid grid-cols-2 mt-2 md:mt-0 md:grid-cols-3 gap-1">
                <div className=" h-[150px] relative">
                  <Image src="/images/img8.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/img7.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/loo2.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/img14.webp" alt="image" fill />
                </div>
                <div className="h-[150px] col-span-2 md:col-span-1 relative">
                  <Image src="/images/bal1.webp" alt="image" fill />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[14px] mt-4 md:mt-0">
                This luxury accommodation offers fully en-suite rooms, providing
                a private and comfortable space for guests. The rooms feature a
                spacious lounge with a coffee table, allowing guests to enjoy a
                cup of coffee or tea while spending time together or relaxing.
                Guests can also enjoy their favorite shows or movies on the
                provided television set for entertainment. An additional
                cloakroom is available for added convenience.
              </p>
            </div>
            <div></div>
            <Link
              href="/reservation"
              className="text-white text-center bg-green-800 px-2 py-2 w-[130px] mt-4 md:mt-0"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
        <p
          className={`${cormorant.className} text-green-800 font-bold text-3xl mt-44 mb-2 md:hidden`}
        >
          2 Bedroom Standard Villa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:my-16 w-full">
          <div className="h-[400px] w-full md:aspect-square md:h-[600px] md:w-full relative shadow-xl">
            <Image src="/images/2bed1.webp" alt="image" fill />
          </div>

          <div className="md:h-[600px] md:w-[600px] flex flex-col justify-between ">
            <div className=" text-green-800">
              <h1
                className={`${cormorant.className} text-[50px] font-normal hidden md:block`}
              >
                2 Bedroom Standard Villa
              </h1>
            </div>
            <div className="grid">
              <div className="grid grid-cols-2 mt-2 md:mt-0 md:grid-cols-3 gap-1">
                <div className=" h-[150px] relative">
                  <Image src="/images/open.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/open2.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/loo3.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/2bed2.webp" alt="image" fill />
                </div>
                <div className="h-[150px] col-span-2 md:col-span-1 relative">
                  <Image src="/images/bal4.webp" alt="image" fill />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[14px] mt-4 md:mt-0">
                This accommodation offers a blend of comfort and style. The
                open-plan living room features a cozy lounge and an open kitchen
                that seamlessly integrates into the living space, allowing for
                easy interaction while preparing meals. The compact and stylish
                design of the dining area provides a space to enjoy your meals.
                With its open-plan concept, this studio accommodation creates a
                sense of spaciousness, making it an ideal choice for those who
                appreciate a modern and minimalistic living environment.{" "}
              </p>
            </div>
            <div></div>
            <Link
              href="/reservation"
              className="text-white text-center bg-green-800 px-2 py-2 w-[130px] mt-4 md:mt-0"
            >
              BOOK NOW
            </Link>
          </div>
        </div>

        <p
          className={`${cormorant.className} text-green-800 font-bold text-3xl mt-12 mb-2 md:hidden`}
        >
          1 Bedroom Villa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 md:my-16 w-full">
          <div className="h-[400px] w-full md:aspect-square md:h-[600px] md:w-full relative shadow-xl">
            <Image src="/images/2bed.webp" alt="image" fill />
          </div>

          <div className="md:h-[600px] md:w-[600px] flex flex-col justify-between ">
            <div className=" text-green-800">
              <h1
                className={`${cormorant.className} text-[50px] font-normal hidden md:block`}
              >
                1 Bedroom Villa
              </h1>
            </div>
            <div className="grid">
              <div className="grid grid-cols-2 mt-2 md:mt-0 md:grid-cols-3 gap-1">
                <div className=" h-[150px] relative">
                  <Image src="/images/open3.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/1bed2.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/loo2.webp" alt="image" fill />
                </div>
                <div className="h-[150px] relative">
                  <Image src="/images/2bed.webp" alt="image" fill />
                </div>
                <div className="h-[150px] col-span-2 md:col-span-1 relative">
                  <Image src="/images/bal1.webp" alt="image" fill />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[14px] mt-4 md:mt-0">
                The studio accommodation features a lounge with a coffee table
                and a TV, providing a stylish space for relaxation. High-speed
                WIFI is available throughout the property. The open-plan kitchen
                is fully equipped with a gas cooker, fridge, microwave, and
                coffee maker. Adjacent to the kitchen, there is a dining area
                that comfortably accommodates four people. The villa's elegant
                finishes and amenities offer a sophisticated and enjoyable
                stay..
              </p>
            </div>
            <div></div>
            <Link
              href="/reservation"
              className="text-white text-center bg-green-800 px-2 py-2 w-[130px] mt-4 md:mt-0"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Rooms;
