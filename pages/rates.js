import Image from "next/image";
import axios from "axios";
import ClientLayout from "../components/ClientLayout";
import { Cormorant } from "next/font/google";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Rates = () => {
  const [houseA, setHouseA] = useState([]);
  const [houseB, setHouseB] = useState([]);
  const [houseC, setHouseC] = useState([]);
  const [loading, setLoading] = useState(true);
  let formatter = new Intl.NumberFormat("en-us");
  useEffect(() => {
    const getRates = async () => {
      try {
        await axios.get("/api/rates").then((res) => {
          const allRates = res.data;

          setHouseA(allRates[0]);
          setHouseB(allRates[1]);
          setHouseC(allRates[2]);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getRates();
  }, []);
  return (
    <ClientLayout>
      <div className="h-full md:h-full px-4 w-full mb-24">
        <div
          className={`${cormorant.className} text-[30px] text-center md:text-left md:text-[40px]  pt-4 font-bold text-green-800 my-12`}
        >
          <h1>OUR</h1>
          <h1 className="-mt-2 md:-mt-5"> RATES</h1>
        </div>
        <div className=" md:w-full border-b-[0.8px] pb-12">
          {loading ? (
            <>
              <div className="border-[0.8px] md:hidden border-slate-200 p-1 space-x-1">
                <div className="h-[250px]">
                  <Skeleton variant="rectangle" height={250} />
                </div>
              </div>
              <div className="border-[0.8px] hidden border-slate-200 md:flex w-full  p-1 space-x-1">
                <div className="h-full w-1/2">
                  <Skeleton variant="rectangle" height={368} />
                </div>
                <div className="w-1/2 hidden md:flex flex-col space-y-1">
                  <Skeleton variant="rectangle" height={120} animation="wave" />
                  <Skeleton variant="rectangle" height={120} animation="wave" />
                  <Skeleton variant="rectangle" height={120} animation="wave" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <table className=" md:hidden w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Low Season</th>
                      <th>High Season</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border border-slate-400 font-bold">
                        Apartment Type
                      </td>
                      <td className="border border-slate-400">
                        4th Jan - 30th June
                      </td>
                      <td className="border border-slate-400">
                        1st July - 20th Dec
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td className="border border-slate-400 font-bold">
                        {houseA.houseName}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseA.lowSeason)}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseA.highSeason)}
                      </td>
                    </tr>
                    <tr className="text-center border border-separate">
                      <td className="border border-slate-400 font-bold">
                        {houseB.houseName}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseB.lowSeason)}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseB.highSeason)}
                      </td>
                    </tr>
                    <tr className="text-center border border-separate">
                      <td className="border border-slate-400 font-bold">
                        {houseC.houseName}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseC.lowSeason)}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseC.highSeason)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className=" md:hidden w-full mt-6">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Christmas/New Yr</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="border border-slate-400 font-bold">
                        Apartment Type
                      </td>
                      <td className="border border-slate-400">
                        21st Dec - 6th Jan
                      </td>
                    </tr>
                    <tr className="text-center">
                      <td className="border border-slate-400 font-bold">
                        {houseA.houseName}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseB.christmasNewYear)}
                      </td>
                    </tr>
                    <tr className="text-center border border-separate">
                      <td className="border border-slate-400 font-bold">
                        {houseB.houseName}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseB.christmasNewYear)}
                      </td>
                    </tr>
                    <tr className="text-center border border-separate">
                      <td className="border border-slate-400 font-bold">
                        {houseC.houseName}
                      </td>
                      <td className="border border-slate-400">
                        KES {formatter.format(houseC.christmasNewYear)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className=" border-separate border border-slate-400 h-[400px] md:w-full mt-12 mytable ">
                  <thead className="">
                    <tr className="">
                      <th className=" py-4 px-2 md:px-6   text-black font-bold"></th>

                      <th className="border-b-[0.6px] border-slate-400 py-4 text-center bg-green-300 text-white font-bold">
                        Low Season
                      </th>

                      <th className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-700 text-white font-bold">
                        High Season
                      </th>
                      <th className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-900 text-white font-bold">
                        Christmas / New Yr
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b-[0.6px] border-slate-400 text-center py-4 font-bold">
                        APARTMENT TYPE
                      </td>
                      <td className="border-b-[0.6px] border-slate-400 bg-green-300 text-center py-4 font-bold">
                        4th Jan - 30th June
                      </td>

                      <td className="border-b-[0.6px] border-slate-400 py-4 text-center bg-green-700 text-white font-bold">
                        1st July - 20th Dec{" "}
                      </td>
                      <td className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-900 text-white font-bold">
                        21st Dec - 6th Jan
                      </td>
                    </tr>
                    <tr>
                      <td className="flex flex-col items-center justify-center h-full py-4 border-b-[0.6px] border-slate-400">
                        {houseA.houseName}
                      </td>
                      <td className=" border-b-[0.6px] border-slate-400 bg-green-300 text-center py-4 font-bold">
                        KES {formatter.format(houseA.lowSeason)}
                      </td>

                      <td className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-700 text-white font-bold">
                        KES {formatter.format(houseA.highSeason)}
                      </td>
                      <td className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-900 text-white font-bold">
                        KES {formatter.format(houseA.christmasNewYear)}
                      </td>
                    </tr>
                    <tr>
                      <td className="flex flex-col items-center justify-center h-full  py-4 border-b-[0.6px] border-slate-400">
                        {houseB.houseName}
                      </td>
                      <td className=" border-b-[0.6px] border-slate-400 bg-green-300 text-center py-4 font-bold">
                        KES {formatter.format(houseB.lowSeason)}
                      </td>

                      <td className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-700 text-white font-bold">
                        KES {formatter.format(houseB.highSeason)}
                      </td>
                      <td className="border-b-[0.6px] border-slate-400 py-4 text-center bg-green-900 text-white font-bold">
                        KES {formatter.format(houseB.christmasNewYear)}
                      </td>
                    </tr>
                    <tr>
                      <td className="flex flex-col items-center justify-center h-full py-4 border-b-[0.6px] border-slate-400">
                        {houseC.houseName}
                      </td>
                      <td className=" border-b-[0.6px] border-slate-400 bg-green-300 text-center py-4 font-bold">
                        KES {formatter.format(houseC.lowSeason)}
                      </td>

                      <td className=" border-b-[0.6px] border-slate-400 py-4 text-center bg-green-700 text-white font-bold">
                        KES {formatter.format(houseC.highSeason)}
                      </td>
                      <td className="border-b-[0.6px] border-slate-400 py-4 text-center bg-green-900 text-white font-bold">
                        KES {formatter.format(houseC.christmasNewYear)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="mt-12 flex flex-col space-y-4">
            <li className="list-disc">Rates include: Accommodation and Gas</li>
            <li className="list-disc">
              Note: Infants and babies of up to 3 years are not charged
            </li>
            <li className="list-disc">
              Check-In Time: 12 noon – 8pm (12:00 – 20:00)
            </li>
            <li className="list-disc">
              Check-Out Time: 6am – 10am (06:00 – 10:00)
            </li>
            <li className="list-disc">
              Late checkout upon request and AVAILABILITY till 12:00 noon.
            </li>
            <li className="list-disc">
              After 12:00 noon, an additional 50% day rate will be charged.
            </li>
            <li className="list-disc">
              An additional cost of 50% will be charged for late checkout &
              early checkin
            </li>
          </div>
        </div>

        <div className="my-8">
          <h5
            className={` font-semibold ${cormorant.className} text-[30px] mb-7 text-green-800`}
          >
            Payment Terms & Conditions
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <ol className="flex flex-col space-y-2">
                <li className="  py-2">
                  <span className="font-bold">1. Payment Methods:</span> <br />{" "}
                  We accept payment by bank deposit and MPESA We do not accept
                  cash and personal checks.
                </li>
                <li className="  py-2">
                  <span className="font-bold">2. Deposit:</span> <br /> A
                  deposit of 50% of the total booking cost is required at the
                  time of booking to secure your reservation.
                </li>
                <li className="  py-2">
                  <span className="font-bold">3. Remaining Balance:</span>{" "}
                  <br /> The remaining balance of your booking must be paid upon
                  arrival at the hotel.
                </li>
                <li className="py-2">
                  <span className="font-bold">4. Cancellation Policy:</span>{" "}
                  <br />
                  <p>-Free of Charge up to 30 days prior to arrival</p>
                  <p>
                    -14 days prior to arrival, 50% of the total amount
                    applicable
                  </p>
                  <p>
                    -3 days prior, to arrival, 75% of the total amount
                    applicable
                  </p>
                  <p>
                    Any last-minute cancellation, early departures, late
                    arrivals or no-shows: 100% of the total amount applicable.
                  </p>
                  <br />
                  <p>* NO REFUND AFTER CHECK IN WHATSOEVER</p>
                </li>
                <li className="  py-2">
                  <span className="font-bold">5. No-shows:</span>
                  <br /> If you do not show up for your reservation and do not
                  notify us of a cancellation, you will be charged for the full
                  amount of the booking.
                </li>
                <li className="  py-2">
                  <span className="font-bold">6. Additional Charges:</span>
                  <br />
                  Please note that additional charges may apply for any extra
                  services or amenities requested during your stay.
                </li>
                <li className="  py-2">
                  <span className="font-bold">7. Currency:</span>
                  <br /> All rates are quoted and charged in the local currency,
                  and currency exchange rates may apply if paying with a foreign
                  currency.
                </li>
                <li className="  py-2">
                  <span className="font-bold">8. Taxes:</span>
                  <br /> Local taxes may be applied to your booking and will be
                  included in the total price.
                </li>
              </ol>
            </div>
            <div className="relative md:h-[820px]">
              <Image src="/images/payment.jpg" alt="payment" fill />
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default Rates;
