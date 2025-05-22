import BuilderDevTools from "@builder.io/dev-tools/next";
import type { NextConfig } from "next";

/**
 * Next.js configuration with Builder.io integration
 * Optimized for React 19 client-side rendering approach
 */
const nextConfig: NextConfig = BuilderDevTools()({
  // Basic configuration
  output: 'standalone',
  
  // Allow Builder.io CDN images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
    ],
  },
  
  // Disable TypeScript type checking during build for React 19 compatibility
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip linting during builds for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  }
});

export default nextConfig;
