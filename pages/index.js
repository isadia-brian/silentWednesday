import ClientLayout from "@/components/ClientLayout";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import Things from "@/components/Things";
import Video from "@/components/Video";
import Why from "@/components/Why";

const Home = () => {
  return (
    <ClientLayout>
      <Hero />
      <Story />
      <Featured />
      <Things />
      <Why/>
      <Video/>
      <Testimonials />
    </ClientLayout>
  );
};
export default Home;
