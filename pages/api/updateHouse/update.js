import { connectMongoDB } from "@/lib/MongoConnect";
import House from "@/models/HouseModel";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { details, imageUrls } = req.body;

    const id = details.id;

    let updatedHouse;

    if (id) {
      const images = imageUrls;

      try {
        await connectMongoDB();
        const updates = {
          $set: {
            houseName: details.houseName,
            guests: details.guests,
            amount: details.amount,
            description: details.description,
          },
        };
        for (const image of images) {
          for (const label in image) {
            if (!updates.$push) {
              updates.$push = {};
            }
            if (!updates.$push.imageUrls) {
              updates.$push.imageUrls = {};
            }
            updates.$push.imageUrls[label] = image[label];
          }
        }
        updatedHouse = await House.findOneAndUpdate({ _id: id }, updates);
        return res.status(200).json("Updated Successfully");
      } catch (error) {
        return res
          .status(400)
          .json({ error: "Error connecting with the database" });
      }
    } else {
      return res.status(400).json("No ID");
    }
  }
}
