import { connectMongoDB } from "@/lib/MongoConnect";
import Rates from "../../models/RatesModel";
export default async function handler(req, res) {
  const { houseName, lowSeason, highSeason, christmasNewYear, id } = req.body;

  if (req.method === "GET") {
    try {
      await connectMongoDB();
      const allRates = await Rates.find();
      res.status(200).json(allRates);
    } catch (error) {
      console.log("Error getting data:", error);
    }
  } else if (req.method === "PUT") {
    try {
      await connectMongoDB();

      // Find the rate by id
      const rate = await Rates.findOne({ _id: id });

      if (!rate) {
        return res.status(404).json({ error: "Rate not found" });
      }

      // Update the rate with the new values
      rate.lowSeason = lowSeason;
      rate.highSeason = highSeason;
      rate.christmasNewYear = christmasNewYear;

      // Save the updated rate
      await rate.save();
      res.status(200).json({ rateData: rate });
    } catch (error) {
      console.log("Error updating the rates:", error);
    }
  } else {
    res.status(400).json({ msg: "Method not allowed" });
  }
}
