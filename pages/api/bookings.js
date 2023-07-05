import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";
import House from "@/models/HouseModel";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only Post requests are allowed" });
    return;
  }

  const { fromDate, toDate, house, user, amount, totalDays, houseId, guests } =
    req.body;

  try {
    await connectMongoDB();
    const newBooking = new Bookings({
      fromDate,
      toDate,
      house,
      user,
      amount,
      totalDays,
      houseId,
      guests,
    });
    const booking = await newBooking.save();

    const houseTemp = await House.findById(houseId);

    const bookingAmount = amount;
    if (houseTemp) {
      const id = houseTemp._id.toString();

      if (id === "647fc614b582465d08d5146a") {
        const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");
        const monthObject = houseTemp.months.find((m) => m.name === month);

        if (monthObject) {
          monthObject.amount += bookingAmount;
        } else {
          houseTemp.months.push({
            name: month,
            amount: bookingAmount,
            bookingStatus: booking.bookingStatus,
          });
        }
        houseTemp.currentBookings.push({
          bookingId: booking._id,
          fromDate,
          toDate,
          status: booking.status,
        });

        const house2 = await House.findById("64a37cb73ca959c91f7d658c");
        if (house2) {
          house2.currentBookings.push({
            bookingId: booking._id,
            fromDate,
            toDate,
            status: booking.status,
          });
        }
        await house2.save();
      }
      await houseTemp.save();

      res.status(201).send({ msg: "Booking Created Successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ err, msg: "Something went wrong" });
  }
}
