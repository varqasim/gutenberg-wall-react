import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:4566/:path*" }
        ]
      }
    ]
  },
  env: {
    REACT_COGNITO_USER_POOL_ID: process.env.REACT_COGNITO_USER_POOL_ID,
    REACT_COGNITO_USER_POOL_CLIENT_ID: process.env.REACT_COGNITO_USER_POOL_CLIENT_ID,
    REACT_COGNITO_IDENTITY_POOL_ID: process.env.REACT_COGNITO_IDENTITY_POOL_ID
  }
};

export default nextConfig;
