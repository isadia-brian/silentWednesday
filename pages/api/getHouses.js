import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();

      const { id } = req.query;

      if (!id) {
        //returning the whole collection
        const allHouses = await House.find();
        res.status(200).json(allHouses);
      } else {
        //returning a single document
        const oneHouse = await House.findOne({ _id: id });
        res.status(200).json(oneHouse);
      }
    } catch (err) {
      console.error(err);
      res.status(400).send({ err, msg: "Something went wrong" });
    }
  }

  if (req.method === "PUT") {
    const { id, monthId } = req.query;
    const { bookingStatus } = req.body;

    try {
      await connectMongoDB();

      const houseTemp = await House.findById({ _id: id });

      if (houseTemp) {
        const targetMonth = houseTemp.months.find(
          (m) => m._id.toString() === monthId
        );

        if (targetMonth) {
          if (bookingStatus === "Confirmed") {
            targetMonth.bookingStatus = "pending";
          } else if (bookingStatus === "pending") {
            targetMonth.bookingStatus = "Confirmed";
          }
        }
      }
      await houseTemp.save();
      res.status(201).json(houseTemp);
    } catch (error) {
      console.log(error);
    }
  }
}
