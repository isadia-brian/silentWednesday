import Image from "next/image";
import localFont from 'next/font/local'


const poppinsBlack = localFont({src:"../public/fonts/poppins/Poppins-Black.ttf"})
const poppins = localFont({src:"../public/fonts/poppins/Poppins-Medium.ttf"})

const Card = ({image,description,title}) => {
  return (
    <div className="group h-56 md:h-80 overflow-hidden cursor-pointer relative hover:shadow-xl hover:shadow-black/50 transition-shadow">
      <div className="h-56 md:h-80 relative hover:scale-125 ">
          <Image src={image} alt fill className="group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"/>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:to-green-800/70 sc transition-all">

        </div>
        <div className="absolute inset-0 flex flex-col px-3 max-w-[500px] translate-y-[80%] group-hover:translate-y-[20%] md:group-hover:translate-y-[60%] transition-all">
            <h1 className={`${poppinsBlack.className} text-xl md:text-3xl font-bold text-yellow-300`}>{title}</h1>
            <p className={`${poppins.className} text-white font-light text-[12px] opacity-0 group-hover:opacity-100 duration-300 mt-2`}>{description}</p>
        </div>
        
     
    </div>
  )
}

export default Card
