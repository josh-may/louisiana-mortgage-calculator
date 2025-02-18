/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: "/blog",
      },
      {
        source: "/blog/:slug",
        destination: "/blog/:slug",
      },
    ];
  },
};

export default nextConfig;
