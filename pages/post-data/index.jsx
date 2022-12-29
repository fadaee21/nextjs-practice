import axios from "axios";
import React, { useState } from "react";

const PostData = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/register",
        { data: { email, password } },
        {
          header: {
            "Content-Type": "Application/json",
          },
        }
      );
      const data  = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="m-5">
      <div className="container">
        <div className="row ">
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We will never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handlePost}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostData;
