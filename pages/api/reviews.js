import { connectMongoDB } from "@/lib/MongoConnect";
import Reviews from "@/models/ReviewsModel";

export default async function handler(req, res) {
  const { rating, user, message } = req.body;
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      await connectMongoDB();
      Reviews.create({ rating, user, message }).then((data) => {
        res.status(201).send({ data, msg: "Review created successfully" });
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error, msg: "Something went wrong" });
    }
  }

  if (req.method === "GET") {
    try {
      await connectMongoDB();
      if (!id) {
        //return all reviews
        const allReviews = await Reviews.find();
        res.status(201).json(allReviews);
      } else {
        // return a single review by ID
        const review = await Reviews.findOne({ _id: id });
        res.status(201).json(review);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  }
}
