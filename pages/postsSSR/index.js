import Link from "next/link";

const PostList = ({ posts }) => {
  return (
    <>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link href={`/postsSSR/${post.id}`} passHref>
                <span>
                  {post.id} - {post.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default PostList;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:8000/posts");
  const data = await res.json();

  console.log("Regenerating PostList");

  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}
