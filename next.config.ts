import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10Mb"
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "diwgrttvzstvemwbotag.supabase.co",
        pathname: "/storage/v1/object/**"
      }
    ]
  }
};

export default nextConfig;
