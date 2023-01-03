import React from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "../../lib/posts-util";

const PostDetailPage = ({ post }) => {
  return <PostContent post={post} />;
};

export default PostDetailPage;

export const getStaticPaths = async () => {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map((i) => i.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};
export function getStaticProps(ctx) {
  const { params } = ctx;
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}
