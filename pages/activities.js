import ClientLayout from '@/components/ClientLayout'
import Image from 'next/image'

import { Cormorant } from "next/font/google";
import localFont from 'next/font/local'
import Heading from '@/components/Heading';


const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Activities = () => {
  return (
    <ClientLayout>
        <div className='px-4 mb-32 h-full w-full'>
        <div  className={`${cormorant.className} text-[30px] md:text-[50px] md:text-center mt-3 font-bold text-green-800 my-12`}>
          <h1>ACTIVITIES</h1>
     
        </div>

            <div className='md:h-[60vh] h-full w-full flex mt-3 flex-col md:flex-row mb-12 md:text-left'>
                <div className='md:hidden text-sm mb-5'>
                <Heading title="Immerse in Beach Life" className="mb-12 text-center" smallHeader/>
                </div>
                <div className='relative h-[300px] w-full md:h-full md:w-1/2 md:aspect-square'>
                    <Image src="/images/beach.jpg" alt fill/>
                </div>
                <div className='md:ml-20'>
                    <div className='hidden md:flex'>
                    <Heading title="Immerse in Beach Life" className="mb-12 hidden" smallHeader/>
                    </div>
                  
                    
                      <p className='md:w-[500px] md:mx-auto font-semibold mt-12  md:mt-36'>From the moment you arrive, the soothing sound of crashing waves and the salty breeze envelop you, transporting you to a world of relaxation and rejuvenation. Sink your toes into the warm sand as you stroll along the shore, feeling the gentle caress of the ocean against your skin. Engage in exciting water activities like swimming, surfing, or snorkeling, immersing yourself in the thrill of the sea. </p>
                </div>
              
            </div>
            <div className='md:h-[60vh] w-full flex flex-col md:flex-row  mb-12'>
                <div className=''>
                    <div className=''>
                    <Heading title="Snorkelling" smallHeader />
                    </div>
                    
                    
                <p className=' font-semibold md:mr-20 md:mt-36 md:max-w-[500px]'>Discover the Hidden Depths: Snorkelling Adventure Awaits." Immerse yourself in a world teeming with vibrant marine life and fascinating underwater landscapes. Equipped with a snorkel and mask, plunge into crystal-clear waters, where a kaleidoscope of colors awaits your gaze. Float effortlessly above coral reefs, observing their intricate formations and the myriad of fish darting among them.  </p>
                </div>
           
                <div className='relative h-[400px] mt-12 md:mt-0 md:w-1/2 w-full md:h-full aspect-square'>
                    <Image src="/images/snorka.jpg" alt fill/>
                </div>
               
            </div>
            <div className='md:h-[60vh] w-full flex flex-col-reverse md:flex-row  mb-12'>
                <div className='relative md:mt-0 h-[400px] mt-12 w-full md:h-full md:w-1/2 md:aspect-square'>
                    <Image src="/images/raft.jpg" alt fill/>
                </div>
                <div className='md:ml-20'>
                    <Heading title="KAYAKING" smallHeader />
                    <p className='font-semibold md:mr-20 md:mt-36 md:max-w-[500px]'>Kayaking offers an exhilarating escape into the realm of water and nature. As you settle into your kayak, you become one with the gentle current, gliding along pristine waterways. With each paddle stroke, you propel yourself forward, feeling a sense of freedom and serenity wash over you. The rhythmic motion of your paddle becomes a symphony, harmonizing with the sounds of nature that surround you. </p>
                </div>
              
            </div>
            <div className='md:h-[60vh] w-full flex flex-col md:flex-row mb-12'>
                <div className='md:mr-20'> 
                    <Heading title="Adventure Tsavo" smallHeader />
                    <p className='md:w-[500px]  md:mt-36 font-semibold'>Engage in an extraordinary journey through the untamed wilderness of Tsavo, where an awe-inspiring animal kingdom awaits your exploration. Step into a realm where mighty elephants roam freely, their majestic presence leaving you in awe. Witness graceful giraffes as they elegantly stretch their long necks to reach the leaves of towering acacia trees. Marvel at the stealth and power of Tsavo's predators, from lions to cheetahs, as they navigate the vast savannah in search of their next meal. </p>
                </div>
           
                <div className='relative md:mt-0 h-[400px] mt-12 w-full md:h-full md:w-1/2 md:aspect-square'>
                    <Image src="/images/wild.jpg" alt fill/>
                </div>
              
            </div>
         
            
            
           
        </div>
    </ClientLayout>
  )
}

export default Activities
