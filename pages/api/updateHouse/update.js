import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, houseName, guests, description, amount, imageUrls } = req.body;

    try {
      await connectMongoDB();

      const houseTemp = await House.findById(id);

      if (!houseTemp) {
        return res.status(404).json({ error: "House not found" });
      }
      (houseTemp.houseName = houseName),
        (houseTemp.guests = guests),
        (houseTemp.amount = amount),
        (houseTemp.imageUrls = imageUrls),
        (houseTemp.description = description);

      await houseTemp.save();
      res.status(201).json({ houseTemp });
    } catch (error) {
      console.log(error);
    }
  }
}
