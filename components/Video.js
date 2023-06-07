import { useState, useEffect, useRef } from "react";

import { Cormorant } from "next/font/google";

const cormorant = Cormorant({
  subsets: ["cyrillic"],
  weight: ["300", "400", "600", "700"],
});

const Video = () => {
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef();

  // function handlePlayPause(playing) {
  //   setPlaying({ playing: playing });

  //   if (playing) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.pause();
  //     setPlaying(false);
  //   }
  // }

  // // useEffect(() => {
  // //   videoRef.current.controls = false;
  // // }, [playing]);
  return (
    <div className="mt-20 px-4 h-full w-full">
      <div className={`text-center mb-12 max-w-[500px] mx-auto`}>
          <p className={`${cormorant.className} text-[20px] md:text-[32px] font-bold text-green-800 uppercase tracking-[1px] whitespace-pre-wrap`}>As Daylight Fades, Beauty Awakens: Experience Diani Beach's Mesmerizing Sunset</p>
        </div>
      <div className="h-full md:w-[90%] mx-auto relative">
        
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            src="/videos/diani.mp4"
            type="video/mp4"
            muted
            loop="true"
            autoPlay="true"
            className=""
          ></video>
        </div>
        {/* <PlayPause onClick={handlePlayPause} playing={playing} /> */}
      </div>
    </div>
  );
};

// const PlayPause = (props) => {
//   const { onClick, playing } = props;
//   const onPlayClick = () => {
//     onClick(true);
//   };
//   const onPauseClick = () => {
//     onClick(false);
//   };
//   return (
//     <div className="absolute w-full h-full top-0 bg-black bg-opacity-[0.3] opacity-0 hover:opacity-[1]">
//       <svg
//         onClick={() => onPlayClick(playing)}
//         className={`absolute w-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
//           playing ? "opacity-0 pointer-events-none" : " opacity-[1]"
//         }`}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 283.5 283.5"
//       >
//         <circle cx="141.7" cy="141.7" r="137.5" className="fill-green-500" />
//         <path d="M113.6 78.1L201.8 141.7 113.6 205.4" className="fill-white" />
//       </svg>
//       <svg
//         onClick={() => onPauseClick(playing)}
//         className={`absolute w-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
//           playing ? "" : "opacity-0 pointer-events-none"
//         }`}
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 283.5 283.5"
//       >
//         <circle cx="141.7" cy="141.7" r="137.5" className="fill-green-500" />
//         <g xmlns="http://www.w3.org/2000/svg">
//           <rect
//             height="120"
//             width="30"
//             x="95"
//             y="85"
//             className="fill-red-500"
//           />
//           <rect
//             height="120"
//             width="30"
//             x="150"
//             y="85"
//             className="fill-red-500"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// };

export default Video;
