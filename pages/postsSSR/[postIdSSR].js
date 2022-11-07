const PostItem = ({ post }) => {
  return (
    <>
      <h2>
        {post.id} - {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
};
export default PostItem;

export async function getServerSideProps(context) {
  const { params, res, req } = context;
  const response = await fetch(
    `http://localhost:8000/posts/${params.postIdSSR}`
  );
  const data = await response.json();
  console.log(req.headers.cookie); //example for using res, req
  res.setHeader("Set-Cookie", ["name=ali"]); //example for using res, req
  if (!data.id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: data,
    },
  };
}
