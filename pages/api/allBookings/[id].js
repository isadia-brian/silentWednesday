import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
        await connectMongoDB();
    
        const { id } = req.query;
    
        const booking = await Bookings.findById(id);
        if (!booking) {
          res.status(404).json({ msg: "Booking not found" });
          return;
        }
    
        res.status(200).json(booking);
      } catch (err) {
        console.error(err);
        res.status(400).json({ err, msg: "Something went wrong" });
      }
  }

 
  if (req.method === "PUT") {
    try {
      await connectMongoDB();

      const { id } = req.query;

      // Find the booking by ID
      const booking = await Bookings.findById(id);
      if (!booking) {
        res.status(404).json({ msg: "Booking not found" });
        return;
      }

      // Update the booking property
      booking.bookingStatus = 'Confirmed'; 
      // Save the updated booking
      const updatedBooking = await booking.save();

      res.status(200).json(updatedBooking);
    } catch (err) {
      console.error(err);
      res.status(400).json({ err, msg: "Something went wrong" });
    }
  }

}
