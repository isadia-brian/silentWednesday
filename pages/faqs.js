import Accordion from "@/components/Accordion";
import ClientLayout from "@/components/ClientLayout";

import { useState } from "react";

const FAQS = () => {
  const [open, setIsOpen] = useState(true);

  return (
    <div className=" h-full ">
     
        <ClientLayout>
          <div className="w-full bg-gray-200 p-12  ">
          <div className="  w-1/2">
          <Accordion open={open} />
          </div>
          </div>
        
        </ClientLayout>
     
    </div>
  );
};

export default FAQS;
