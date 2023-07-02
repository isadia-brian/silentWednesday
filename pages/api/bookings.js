import { connectMongoDB } from "@/lib/MongoConnect";
import Bookings from "@/models/BookingModel";
import House from "@/models/HouseModel";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only Post requests are allowed" });
    return;
  }

  const { fromDate, toDate, house, user, amount, totalDays, houseId } =
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
    });
    const booking = await newBooking.save();

    const houseTemp = await House.findById(houseId);
    const month = moment(fromDate, "DD-MM-YYYY").format("MMMM");

    const bookingAmount = amount;

    if (houseTemp) {
      // Check if houseTemp is defined before accessing it
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
    }

    await houseTemp.save();

    res.status(201).send({ msg: "Booking Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ err, msg: "Something went wrong" });
  }
}
