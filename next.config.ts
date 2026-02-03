import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
    domains: [
      'cdn.dummyjson.com',
      'i.dummyjson.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost', 
    ],
  },
  reactCompiler: true,
  output: 'standalone',
  compress: true,
  generateEtags: true,
  reactStrictMode: true,
  
  turbopack: {
      resolveAlias: {
      '@': './src',
      '@components': './src/components',
      '@styles': './src/styles',
      '@lib': './src/lib',
      '@types': './src/types',
      '@app': './src/app',
      '@icons': './public/icons',
      '@images':'./public/images'
    },
  },
};

export default nextConfig;
