import { connectMongoDB } from "@/lib/MongoConnect";
import Message from "@/models/MessageModel";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only Post requests are allowed" });
    return;
  }

  try {
    await connectMongoDB();
    const allMessages = await Message.find({}).sort({ updatedAt: -1 });
    res.status(200).json(allMessages);
  } catch (err) {
    console.error(err);
    res.status(400).send({ err, msg: "Something went wrong" });
  }
}
