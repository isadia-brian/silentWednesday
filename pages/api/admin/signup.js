import bcrypt from "bcrypt";
import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/models/UsersModel";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only Post requests are allowed" });
    return;
  }

  const { email, password } = req.body;

  try {
    await connectMongoDB();
    // Find the user by email

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
