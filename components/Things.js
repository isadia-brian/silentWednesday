import localFont from "next/font/local";
import Image from "next/image";
import { motion } from "framer-motion";
import Heading from "./Heading";
import Card from "./Card";

const Activities = [
  {
    title:"Immerse in Beach Life",
    image:"/images/beach.jpg",
    description:"Sink your toes into the warm sand as you indulge in delicious seafood delicacies, engage in exciting water activities, and savor breathtaking views, immersing yourself in the vibrant beach life experience.",
  },
  {
    title:"Snorkelling",
    image:"/images/snorka.jpg",
    description:"Each moment spent exploring beneath the surface unveils a new chapter of the ocean's captivating story.",
  },
  {
    title:"Kayaking",
    image:"/images/raft.jpg",
    description:"Whether you embark on a solo adventure or join a group, kayaking becomes a gateway to discovery, a way to connect with nature",
  },
  {
    title:"Jetskiing",
    image:"/images/jetsky.jpg",
    description:"Feel the surge of excitement as you rev the engine and accelerate, skimming across the water's surface with exhilarating speed.",
  },
  {
    title:"Tour Tsavo",
    image:"/images/wild.jpg",
    description:" Engage in an extraordinary journey through the untamed wilderness of Tsavo, where an awe-inspiring animal kingdom awaits your exploration. ",
  },
]

function Things() {
  return (
    <div className="w-full h-full px-4">
      <div className="relative">
      <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.9 }}
          className="text-center py-10 md:py-20"
        >
          <Heading title="Things To do while in Diani" />
          <div className="bg-yellow-400 w-[50px] h-[3px] absolute left-1/2  bottom-16"></div>
        </motion.h1>
        <p></p>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        {
          Activities.slice(0,1).map((activity, index) => (
            <Card title={activity.title} image={activity.image} description={activity.description}/>
            ))
        }
        <div className="grid grid-cols-2 gap-2">
        {
          Activities.slice(1,3).map((activity, index) => (
            <Card title={activity.title} image={activity.image} description={activity.description}/>
            ))
        }
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
      {
          Activities.slice(3,5).map((activity, index) => (
            <Card title={activity.title} image={activity.image} description={activity.description}/>
            ))
        }
      </div>
    </div>
  );
}

export default Things;
