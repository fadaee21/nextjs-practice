import axios from "axios";
import React from "react";

const MoviePage = () => {
  const fetchMovie = async () => {
    try {
      const response = await axios.get("/api/movie", {
        headers: {
          "Content-Type": "application.json",
        },
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn btn-success" onClick={fetchMovie}>
      fetch movie
    </button>
  );
};

export default MoviePage;
