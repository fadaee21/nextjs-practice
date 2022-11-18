import axios from "axios";
var cookie = require("cookie");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const resApi = await axios("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      const data = await resApi.data;

      if (resApi.status === 200) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", data.token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
            //in development http is ok but in product just https
            secure: process.env.NODE_ENV !== "development",
          })
        );
        res.status(200).json({ user: data.user });
      } else {
        res.status(resApi.status).json({ message: data });
      }
    } catch (e) {
      console.log(e.response.data)
      res.status(e.response.status).json({ message: e.response.data });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
