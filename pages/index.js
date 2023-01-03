import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPOsts } from "../lib/posts-util";

const Home = ({ posts }) => {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const featuredPosts = getFeaturedPOsts();
  return {
    props: {
      posts: featuredPosts,
    },
  };
};
