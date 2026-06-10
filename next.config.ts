import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@neondatabase/serverless'],
  async rewrites() {
    return [
      {
        source: '/worldcup26',
        destination: '/worldcup26/index.html',
      },
    ];
  },
};

export default nextConfig;
