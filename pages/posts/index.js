import Link from "next/link";
import React from "react";

const postsPage = () => {
  return (
    <>
      <h3>page of all posts</h3>

      <ul>
        <li>
          <Link href={"/posts/1"}>page 1</Link>
        </li>
        <li>
          <Link href={"/posts/2"}>page 2</Link>
        </li>
        <li>
          <Link href={"/posts/3"}>page 3</Link>
        </li>
      </ul>
    </>
  );
};

export default postsPage;
