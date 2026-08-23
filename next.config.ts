import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.skydream.gr" },
      { protocol: "https", hostname: "skydream.gr" },
      { protocol: "https", hostname: "www.skydream.gr" },
      { protocol: "https", hostname: "skydream.gr" },
    ],
  },
};

export default nextConfig;
