import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      // Add your custom Vercel Blob domain if you have one
      // {
      //   protocol: 'https',
      //   hostname: 'your-custom-domain.com',
      // },
    ],
  },
};

export default nextConfig;
