import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase, readDocument } from "../../../lib/db";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = await readDocument(
          client,
          "auth-users",
          "users"
        );
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        // check user exist
        if (!user) {
          client.close();
          throw new Error("No user found!اصلا یه همچین کسی رو ما نداریم");
        }
        //compare the password entered with password has been hashed in database
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        //check password of user is valid
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in! آقا پسوردت درست نیست");
        }
        client.close();
        return { email: user.email };
      },
    }),
  ],
};
export default NextAuth(authOptions);
