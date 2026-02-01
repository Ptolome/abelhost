import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
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
      // Добавьте другие домены, которые используете
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
    // Или используйте более простой вариант со списком доменов
    domains: [
      'cdn.dummyjson.com',
      'i.dummyjson.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost', // для локальной разработки
    ],
  },
  reactCompiler: true,

  // sassOptions: {
  //   includePaths: [path.join(__dirname, '.src/styles')],
  // },
  turbopack: {
    // Добавьте алиасы для Turbopack
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
