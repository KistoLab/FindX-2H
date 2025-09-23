import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.grok.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "work.fife.usercontent.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Vercel optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
