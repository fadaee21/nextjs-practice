import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const uri =
    "mongodb+srv://fadarash-next_35:WdjdMV5sI6sdymN1@cluster0.twv8nop.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  return client;
}

export async function readDocument(client, dbName, collectionObj) {
  const db = client.db(dbName);
  const result = db.collection(collectionObj);
  return result;
}
