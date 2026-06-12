import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendBaseUrl = process.env.DOCO_API_URL ?? "http://localhost:8080";

    return [
      {
        source: "/api/:path*",
        destination: `${backendBaseUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
