import Image from 'next/image'
import { motion } from "framer-motion";
import ClientLayout from "../components/ClientLayout";
import { Cormorant } from "next/font/google";
import localFont from 'next/font/local'


const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});


const Rates = () => {
  return (
    
      <ClientLayout>
      <div className="h-full md:h-full px-4 w-full">
      <div  className={`${cormorant.className} text-[30px] md:text-[50px] text-center font-bold text-green-800`}>
          <h1>OUR</h1>
          <h1 className="md:-mt-8">RATES</h1>
        </div>
        <div className=" md:w-full border-b-[0.8px] pb-12">
          <table className=' md:hidden w-full'>
            <thead>
              <tr>
                <th></th>
                <th>Low Season</th>
                <th>Summer</th>
            
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'>
                <td className='border border-slate-400 font-bold'>Apartment Type</td>
                <td className='border border-slate-400'>4th Jan - 30th June</td>
                <td className='border border-slate-400'>1st July - 30th Nov</td>
               
              </tr>
              <tr className='text-center'>
                <td className='border border-slate-400 font-bold'>1 Bedroom</td>
                <td className='border border-slate-400'>KES 5,000</td>
                <td className='border border-slate-400'>KES 6,500</td>
               
              </tr>
              <tr className='text-center border border-separate'>
                <td className='border border-slate-400 font-bold'>2 Bedroom</td>
                <td className='border border-slate-400'>KES 8,000</td>
                <td className='border border-slate-400'>KES 10,500</td>
               
              </tr>
            </tbody>
          </table>
          <table className=' md:hidden w-full mt-6'>
            <thead>
              <tr>
                <th></th>
                <th>High Season</th>
                <th>Festive</th>
            
              </tr>
            </thead>
            <tbody>
              <tr className='text-center'>
                <td className='border border-slate-400 font-bold'>Apartment Type</td>
                <td className='border border-slate-400'>1st Dec - 20th Dec</td>
                <td className='border border-slate-400'>21st Dec - 6th Jan</td>
               
              </tr>
              <tr className='text-center'>
                <td className='border border-slate-400 font-bold'>1 Bedroom</td>
                <td className='border border-slate-400'>KES 8,000</td>
                <td className='border border-slate-400'>KES 10,000</td>
               
              </tr>
              <tr className='text-center border border-separate'>
                <td className='border border-slate-400 font-bold'>2 Bedroom</td>
                <td className='border border-slate-400'>KES 12,000</td>
                <td className='border border-slate-400'>KES 15,000</td>
               
              </tr>
            </tbody>
          </table>
          <table className=" border-separate border border-slate-400 h-[400px] md:                w-full mt-12 mytable ">
            <thead className=''>
              <tr className=''>
                <th className=" py-4 px-2 md:px-6 border-b-[0.6px] border-slate-400  text-white font-bold"></th>

                <th className="border-b-[0.6px] border-slate-400 py-4 px-2 md:px-6 bg-green-300 text-white font-bold">
                  Low Season
                </th>
                <th className=" border-b-[0.6px] border-slate-400 py-4 md:px-6 bg-green-500 text-white font-bold">
                  Summer
                </th>
                <th className=" border-b-[0.6px] border-slate-400 py-4 md:px-6 bg-green-700 text-white font-bold">
                  High Season
                </th>
                <th className=" border-b-[0.6px] border-slate-400 py-4 md:px-6 bg-green-900 text-white font-bold">
                  Christmas / New Yr
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex flex-col items-center justify-center h-full border-b-[0.6px] border-slate-400">
                  Apartment type
                </td>
                <td className="border-b-[0.6px] border-slate-400 bg-green-300 px-6 py-4 font-bold">
                  4th Jan - 30th June
                </td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-500 text-white font-bold">
                  1st July - 30th Nov
                </td>
                <td className="border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-700 text-white font-bold">
                  1st Dec - 20th Dec{" "}
                </td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-900 text-white font-bold">
                  21st Dec - 6th Jan
                </td>
              </tr>
              <tr>
                <td className="flex flex-col items-center justify-center h-full px-6 py-4 border-b-[0.6px] border-slate-400">1 BEDROOM</td>
                <td className=" border-b-[0.6px] border-slate-400 bg-green-300 px-6 py-4 font-bold">KES 5,000</td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-500 text-white font-bold">KES 6,500</td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-700 text-white font-bold">KES 8,500</td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-900 text-white font-bold">
                  KES 10,000
                </td>
              </tr>
              <tr>
                <td className="flex flex-col items-center justify-center h-full px-6 py-4 border-b-[0.6px] border-slate-400">2 BEDROOM</td>
                <td className=" border-b-[0.6px] border-slate-400 bg-green-300 px-6 py-4 font-bold">KES 8,000</td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-500 text-white font-bold">
                  KES 10,000
                </td>
                <td className=" border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-700 text-white font-bold">
                  KES 12,000
                </td>
                <td className="border-b-[0.6px] border-slate-400 py-4 px-6 bg-green-900 text-white font-bold">
                  KES 15,000
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-12">
            <p>
              Rates include: Accommodation, daily housekeeping, electricity, gas
              & free WIFI
            </p>
            <p>Note: Infants and babies of up to 3 years are not charged</p>
            <p>Check-In Time: 2pm – 8pm (14:00 – 20:00)</p>
            <p>Check-Out Time: 6am – 10am (06:00 – 10:00)</p>
            <p>Late checkout upon request and AVAILABILITY till 12:00 noon.</p>
            <p>After 12:00 noon, an additional 50% day rate will be charged.</p>
          </div>
        </div>

        <div className="my-8">
          <h5 className={` font-semibold ${cormorant.className} text-[30px] mb-7 text-green-800`}>
            Payment Terms & Conditions
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
            <ol className="flex flex-col space-y-2">
            <li className="  py-2">
              <span className="font-bold">Payment Methods:</span> <br /> We
              accept payment by bank deposit and MPESA We do not accept cash and
              personal checks.
            </li>
            <li className="  py-2">
              <span className="font-bold">Deposit:</span> <br /> A deposit of
              50% of the total booking cost is required at the time of booking
              to secure your reservation.
            </li>
            <li className="  py-2">
              <span className="font-bold">Remaining Balance:</span> <br /> The
              remaining balance of your booking must be paid upon arrival at the
              hotel.
            </li>
            <li className="  py-2">
              <span className="font-bold">Cancellation Policy:</span> <br /> If
              you need to cancel your reservation, please do so at least 48
              hours before your scheduled arrival time to receive a full refund.
              If you cancel within 48 hours of your scheduled arrival time, your
              deposit will not be refunded.
            </li>
            <li className="  py-2">
              <span className="font-bold">No-shows:</span>
              <br /> If you do not show up for your reservation and do not
              notify us of a cancellation, you will be charged for the full
              amount of the booking.
            </li>
            <li className="  py-2">
              <span className="font-bold">Additional Charges:</span>
              <br />
              Please note that additional charges may apply for any extra
              services or amenities requested during your stay.
            </li>
            <li className="  py-2">
              <span className="font-bold">Currency:</span>
              <br /> All rates are quoted and charged in the local currency, and
              currency exchange rates may apply if paying with a foreign
              currency.
            </li>
            <li className="  py-2">
              <span className="font-bold">Taxes:</span>
              <br /> Local taxes may be applied to your booking and will be
              included in the total price.
            </li>
          </ol>
            </div>
            <div className="relative md:h-[720px]">
              <Image src="/images/payment.jpg" alt="payment" fill/>
            </div>
          </div>
          
        </div>
      </div>
      </ClientLayout>
      
     
   
  );
};

export default Rates;
