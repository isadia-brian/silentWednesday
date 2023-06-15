import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from '@/models/BookingModel'
import House from '@/models/HouseModel'
import moment from 'moment'

export default async function handler(req, res) {
    if(req.method !== "POST"){
        res.status(405).send({msg:"Only Post requests are allowed"})
        return;
    }

    const {
            fromDate:fromThisDay,
            toDate:toThisDay,
            house:houseName,
            user:parsedDetails,
            amount:amountTotal,
            totalDays:noOfDays,
            houseId
    } = req.body;

    try{

        await connectMongoDB()
        const newBooking= new Bookings({fromDate:fromThisDay,
            toDate:toThisDay,
            house:houseName,
            user:parsedDetails,
            amount:amountTotal,
            totalDays:noOfDays,
            houseId
        });
       const booking = await newBooking.save();

        const houseTemp = await House.findById(houseId)

        houseTemp.currentBookings.push({
            bookingId:booking._id,
            fromDate:fromThisDay,
            toDate:toThisDay,
            status:booking.status
        });

         // Calculate and update the total amount for the corresponding month
         const fromMonth=(moment(fromThisDay, 'DD-MM-YYYY').format("MM"));
    // const fromMonth = new Date(fromThisDay).toLocaleString("default", { month: "long" });
    console.log(fromMonth);
    
    houseTemp.months[fromMonth] = (houseTemp.months[fromMonth] || 0) + amountTotal;

    await houseTemp.save();

       

        res.status(201).send({ msg: "Booking Created Successfully" });
           
    }catch(err){
        console.error(err)
        res.status(400).send({err, msg:"Something went wrong"})

    }
  }