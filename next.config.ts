import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/journal", destination: "/blog", permanent: true },
      {
        source: "/journal/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/journal/category/:slug",
        destination: "/blog/category/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
