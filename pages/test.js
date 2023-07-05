import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [rates, setRates] = useState([]);
  useEffect(() => {
    const getRates = async () => {
      try {
        const response = await axios.get("/api/test");

        setRates(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRates();
  }, []);
  return (
    <div>
      <ul>
        {rates.map((rate, index) => {
          const roomType = Object.keys(rate)[1];
          // console.log(roomType);
          const rateDetails = rate[roomType][0];
          console.log(rateDetails);
          const season = Object.values(rateDetails[1]["Christmas/New Yr"]);

          // console.log(season);
          return <li key={index}>{season}</li>;
        })}
      </ul>
    </div>
  );
};

export default Test;
