import { useState, useEffect } from "react";
import ClientLayout from "@/components/ClientLayout";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import Things from "@/components/Things";
import Video from "@/components/Video";
import Why from "@/components/Why";

import Loading from "@/components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <ClientLayout>
            <Hero />
            <Story />
            <Featured />
            <Things />
            <Why />
            <Video />
            <Testimonials />
          </ClientLayout>
        </div>
      )}
    </div>
  );
};
export default Home;
