import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const resApi = await axios("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          c_password: req.body.confirmPassword,
        },
      });

      const data = await resApi.data;

      if (resApi.ok) {
        res.status(200).json({ user: data.user });
      } else {
        res.status(resApi.status).json({ message: data });
      }
    } catch (e) {
      res.status(e.response.status).json({ message: e.response.data });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
