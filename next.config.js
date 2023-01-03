/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    MONGODB_USERNAME: "max-next-project",
    MONGODB_PASSWORD: 123,
    MONGODB_CLUSTER_NAME: "cluster0",
    MONGODB_DATABASE: "all_posts",
  },
};

module.exports = nextConfig;
