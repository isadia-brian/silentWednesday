import { connectMongoDB } from "@/lib/MongoConnect";
import Message from "@/models/MessageModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only Post requests are allowed" });
    return;
  }

  const { user_name, user_phone, user_message, user_email } = req.body;

  try {
    await connectMongoDB();
    Message.create({ user_name, user_phone, user_message, user_email }).then(
      (data) => {
        res.status(201).json(data);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(400).send({ err, msg: "Something went wrong" });
  }
}
