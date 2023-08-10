import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../lib/MongoConnect";
import User from "@/models/UsersModel";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          await connectMongoDB();

          // Check if the email already exists in the database
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            // Sign in if the user exists
            const passwordMatch = await bcrypt.compare(
              password,
              existingUser.password
            );

            if (!passwordMatch) {
              throw new Error("Invalid credentials");
            } else {
              return {
                id: existingUser._id,

                email: existingUser.email,
                userName: existingUser.userName,
              };
            }
          } else {
            throw new Error("You must be an admin");
            return null;
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  session: { strategy: "jwt" },
});
