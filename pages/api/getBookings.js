import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";

export default async function handler(req, res) {
    if(req.method !== "GET"){
        res.status(405).send({msg:"Only GET requests are allowed"})
        return;
    }

    try {
        await connectMongoDB();
            const allBookings = await Bookings.find({}).sort({date: -1});
         
            res.status(200).json(allBookings);
          }


    catch (err) {
        console.error(err)
        res.status(400).send({err, msg:"Something went wrong"})
    }
}