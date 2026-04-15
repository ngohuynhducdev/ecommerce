import type { NextConfig } from "next";

const remotePatterns: Array<{
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname?: string;
}> = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**",
  },
];

const productionHostname = process.env.STRAPI_PRODUCTION_HOSTNAME;
if (productionHostname) {
  remotePatterns.push({
    protocol: "https",
    hostname: productionHostname,
    pathname: "/uploads/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
