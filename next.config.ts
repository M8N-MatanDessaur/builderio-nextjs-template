import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = BuilderDevTools()({
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
    ],
  },
  // Improved configuration for Builder.io content refresh
  experimental: {
    // Disable optimistic client cache in development for better refresh behavior
    optimisticClientCache: false,
  },
  // Disable webpack caching in development to force refreshes
  webpack: (config, { dev }) => {
    if (dev) {
      // Force disable webpack caching in development mode
      config.cache = false;
    }
    return config;
  },
});

export default nextConfig;
