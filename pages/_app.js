import "@/styles/globals.css";
import 'leaflet/dist/leaflet.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
