import axios from "axios";
var cookie = require("cookie");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const resApi = await axios("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });

      const data = await resApi.data;

      if (resApi.status === 200) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            httpOnly: true,
            maxAge: new Date(0),
            path: "/",
            //in development http is ok but in product just https
            secure: process.env.NODE_ENV !== "development",
          })
        );
        res.status(200).json({ user: "success" });
      } else {
        res.status(resApi.status).json({ message: data });
      }
    } catch (e) {
      res.status(e.response.status).json({ message: [e.response.statusText] });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
