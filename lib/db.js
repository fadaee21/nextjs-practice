import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER_NAME}.6nsekre.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  console.log(process.env.MONGODB_USERNAME);
  return client;
}

export async function readDocument(client, dbName, collectionObj) {
  const db = client.db(dbName);
  const result = db.collection(collectionObj);
  return result;
}
