import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Strapi media uploads live on Cloudinary in production.
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        // Local Strapi dev serves uploads from its own disk.
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
