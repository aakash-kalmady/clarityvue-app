import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://img.clerk.com/**"),
      new URL("https://akalmady-clearvue.s3.us-east-2.amazonaws.com/**"),
      new URL("https://www.shutterstock.com/**"),
    ],
  },
};

export default nextConfig;
