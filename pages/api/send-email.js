import { render } from "@react-email/render";
import sgMail from "@sendgrid/mail";
import User from "@/models/UsersModel";
import SilentResetPassword from "@/emails/SilentResetPassword";
import { connectMongoDB } from "@/lib/MongoConnect";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  const emailHtml = render(<SilentResetPassword />);

  if (req.method === "POST") {
    const { email } = req.body;

    try {
      await connectMongoDB();
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const options = {
          from: "developerisadia@gmail.com",
          to: email,
          subject: "Mail from developerisadia ",
          html: emailHtml,
        };
        await sgMail.send(options);
        res.status(200).json({ message: "User is available" });
      } else {
        res.status(404).json({ message: "User not Found" });
      }
    } catch (error) {
      res.status(500).send({ error, message: "Something went wrong" });
    }
  }
}
