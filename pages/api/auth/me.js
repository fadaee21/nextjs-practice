import axios from "axios";
var cookie = require("cookie");

export default async function handler(req, res) {
  if (req.method === "GET") {
    if (!req.cookies.token) {
      res.status(403).json({ message: { err: ["NOT AUTHORIZED1212"] } });
      return;
    }

    try {
      const resApi = await axios("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });

      const data = await resApi.data;

      if (resApi.status === 200) {
        res.status(200).json({ user: data.user });
      } else {
        res
          .status(resApi.status)
          .json({ message: { err: ["USER FORBIDDEN1212"] } });
      }
    } catch (e) {
      res.status(500).json({ message: { err: ["Server Error"] } });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
