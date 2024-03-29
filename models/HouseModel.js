import { Schema, model, models } from "mongoose";

const houseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    noOfGuests: {
      type: Number,
      required: true,
    },
    imageUrls: [],

    roomType: {
      type: String,
      required: true,
    },
    currentBookings: [],
    months: [
      {
        name: String,
        amount: Number,
        bookingStatus: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const House = models.House || model("House", houseSchema);

export default House;
