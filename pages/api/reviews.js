import { connectMongoDB } from "@/lib/MongoConnect";
import Reviews from "@/models/ReviewsModel";

export default async function handler(req, res) {
  const { rating, message, user } = req.body;
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
    const { id } = req.query;
    try {
      await connectMongoDB();
      if (!id) {
        //return all reviews
        const allReviews = await Reviews.find();
        res.status(200).json(allReviews);
      } else {
        // return a single review by ID
        const review = await Reviews.findOne({ _id: id });
        res.status(200).json(review);
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (id) {
      try {
        await connectMongoDB();
        let deletedReview = await Reviews.deleteOne({ _id: id });
        res.status(200).json("Deleted Successfully");
      } catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
      }
    } else {
      res.status(503).json("No Review Found");
    }
  }

  if (req.method === "PUT") {
    const { id } = req.query;
    const { reviewStatus, readStatus } = req.body;

    let updatedData;

    if (id) {
      try {
        await connectMongoDB();
        if (reviewStatus === "Approved") {
          updatedData = await Reviews.updateOne(
            { _id: id },
            {
              $set: {
                reviewStatus: "Pending",
              },
            }
          );
          return res.status(200).json("Updated Successfully");
        } else if (reviewStatus === "Pending") {
          updatedData = await Reviews.updateOne(
            { _id: id },
            {
              $set: {
                reviewStatus: "Approved",
              },
            }
          );
          return res.status(200).json("Updated Successfully");
        } else if (readStatus === true) {
          updatedData = await Reviews.updateOne(
            { _id: id },
            {
              $set: {
                readStatus: false,
              },
            }
          );
          return res.status(200).json("Updated Successfully");
        } else if (readStatus === false) {
          updatedData = await Reviews.updateOne(
            { _id: id },
            {
              $set: {
                readStatus: true,
              },
            }
          );
          return res.status(200).json("Updated Successfully");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  } else {
  }
}
