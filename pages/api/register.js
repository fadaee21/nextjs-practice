import { connectDatabase, readDocument } from "../../helper/db-util";
async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }
  if (req.method === "POST") {
    const { data } = req.body;
    if (!data.password.includes("#")) {
      res.status(406).json({ message: "hey dad password is not acceptable" });
      return;
    }
    try {
      const emails = await readDocument(client, "mongoTest_56", "emails");

      const query = {
        email: data.email,
        password: data.password,
      };
      const email = await emails.insertOne(query);
      console.log(email);
      res.status(201).json({
        message: "haji you have been registered",
        body12: email,
      });
    } catch {
      res.status(201).json({
        message: "haji you have been registered",
      });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
}
export default handler;
