import { useEffect, useState } from "react";
import Video from "@/components/Video";

const test = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(!open), 3000); // 5 seconds delay to
  }, []);
  return (
    <div>
      <div>
        <Video />
      </div>
      {open && (
        <div className="text-center mt-4 ">
          <h1 className="text-xl">Hello</h1>
        </div>
      )}
    </div>
  );
};

export default test;
