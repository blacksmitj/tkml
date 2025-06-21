import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://bizhub-storage.oss-ap-southeast-5.aliyuncs.com/**"),
    ],
  },
};

export default nextConfig;
