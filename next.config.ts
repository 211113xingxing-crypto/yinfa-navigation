import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.qihuiai.com",
      },
    ],
  },
};

export default nextConfig;
