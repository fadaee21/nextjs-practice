import { connectDatabase, readDocument } from "../../helper/db-util";

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const movies = await readDocument(client, "sample_mflix", "movies");
      // Query for a movie that has the title 'The Room'
      const query = { title: "The Room" };
      const options = {
        // sort matched documents in descending order by rating
        sort: { "imdb.rating": -1 },
        // Include only the `title` and `imdb` fields in the returned document
        projection: { _id: 0, title: 1, imdb: 1 },
      };
      const movie = await movies.findOne(query, options);
      console.log(movie);
      res.status(200).json({ movie });
    } catch (err) {
      res.status(500).json({ error: "failed to load data" });
    } finally {
      await client.close();
    }
  }
}

export default handler;
