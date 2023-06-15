import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";

// async function getTotalBookingsPerMonth(houseId, month) {
//     const db = await connectToDatabase();
//     console.log(db);
//     const bookings = db.collection('bookings');
    
  
//     const pipeline = [
//       {
//         $match: {
//           houseId,
//           month: { $eq: month }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalAmount: { $sum: '$amount' }
//         }
//       }
//     ];
  
//     const result = await bookings.aggregate(pipeline).toArray();
//     return result.length > 0 ? result[0].totalAmount : 0;
//   }
  
  export default async function handler(req, res) {
    if (req.method === 'GET') {

      try {
        await connectMongoDB()
        console.log('DB Connected successfully');
        const {id,month} = req.query

        const allBookings = await Bookings.find()
        .where({
          "month": month
          })

          res.status(200).json(allBookings)
      
        // const booking = await Bookings.findById(id)
      } catch (error) {
        console.log(error);
      }
    }
  }
    //   const { houseId, month } = req.query;
    //   console.log(houseId)
  
    //   if (!houseId || !month) {
    //     res.status(400).json({ error: 'Missing parameters' });
    //     return;
    //   }
  
    //   try {
    //     const totalAmount = await getTotalBookingsPerMonth(houseId, month);

    //     res.status(200).json({ houseId, month, });
    //   } catch (error) {
    //     res.status(500).json({ error: 'Internal server error' });
    //   }
    // } else {
    //   res.status(405).json({ error: 'Method Not Allowed' });
    // }
  