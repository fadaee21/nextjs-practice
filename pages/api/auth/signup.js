import { hashPassword } from "../../../lib/auth";
import { connectToDatabase, readDocument } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input - password should also be at least 7 characters long.",
    });
    return;
  }

  let client;
  try {
    client = await connectToDatabase();
    console.log("database connected");
  } catch (error) {
    res.status(500).json({ message: "connecting to database failed" });
    console.log("database not connected");
    return;
  }
  const createAccount = await readDocument(client, "auth-users", "users");
  //to prevent duplicate account
  const existingUser = await createAccount.findOne({ email: email });
  

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  try {
    const createAccount = await readDocument(client, "auth-users", "users");
    const hashedPassword = await hashPassword(password);
    const body = {
      email: email,
      password: hashedPassword,
    };

    const result = await createAccount.insertOne(body);
    // console.log(result);
    res.status(201).json({ message: "Created user!", body });
  } catch (error) {
    console.log(error);
    res.status(418).json({ message: " NOT Created user!" });
  } finally {
    await client.close();
  }
}
export default handler;
