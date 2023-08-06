import { connectMongoDB } from "@/lib/MongoConnect";
import User from "@/models/UsersModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      await connectMongoDB();
      if (!id) {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
      } else {
        //get user by ID
        const user = await User.findOne({ _id: id });
        res.status(200).json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(501).json({ message: error });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (id) {
      try {
        await connectMongoDB();
        let deletedUser = await User.deleteOne({ _id: id });
        return res.status(200).json("Deleted Successfully");
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
      }
    } else {
      res.status(503).json("No User Found");
    }
  }
  if (req.method === "POST") {
    const { userName, email } = req.body;
    console.log(req.body);
    console.log(email);
    if (userName !== "" && email !== "") {
      try {
        await connectMongoDB();
        let userEmail = await User.findOne({ email: email });
        let user = await User.findOne({ userName: userName });

        if (userEmail) {
          throw new Error("Email Already Exist");
        } else if (user) {
          throw new Error("UserName already exist");
        } else {
          const newUser = new User({
            userName: userName,
            email: email,
          });

          const createdUser = await User.create(newUser);

          return res.status(201).json(createdUser);
        }
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error });
      }
    } else {
      console.log("no data");
      return res.status(503).json({ msg: "No data" });
    }
  }
}
