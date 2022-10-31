import { useRouter } from "next/router";
import React from "react";

const Post = () => {
  const router = useRouter();

  const { postId } = router.query;

  const handleClick = () => {
    router.push("/posts");
  };

  return (
    <>
      <h3>The page of Post - {postId}</h3>
      <button onClick={handleClick}>back</button>
    </>
  );
};

export default Post;
