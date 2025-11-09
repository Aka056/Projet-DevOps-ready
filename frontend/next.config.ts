import type { NextConfig } from "next";


const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    INTERNAL_API_URL: process.env.INTERNAL_API_URL,
    APP_ENV: process.env.APP_ENV
  }
};

module.exports = nextConfig;
