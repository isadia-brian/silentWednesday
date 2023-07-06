import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectMongoDB();
      console.log("DB Connected successfully");
      const { id, month } = req.query;

      const allBookings = await Bookings.find().where({
        month: month,
      });

      res.status(200).json(allBookings);

      // const booking = await Bookings.findById(id)
    } catch (error) {
      console.log(error);
    }
  }
}
