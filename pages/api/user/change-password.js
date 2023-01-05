import { getSession } from "next-auth/react";

import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase, readDocument } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = await readDocument(client, "auth-users", "users");

  const user = await usersCollection.findOne({ email: userEmail });
  console.log(user);
  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const currentPassword = user.password;
  //check that user entered correctly old password
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  console.log(passwordsAreEqual);
  if (!passwordsAreEqual) {
    res.status(403).json({ message: "Invalid password." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  //updateOne is method of mongodb to put element
  const result = await usersCollection.updateOne(
    { email: userEmail },
    //$set is method of mongo db
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
}

export default handler;
