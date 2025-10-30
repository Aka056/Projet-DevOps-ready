import type { NextConfig } from "next";

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
    INTERNAL_API_URL: process.env.DOCKER_ENV === "true"
      ? "http://backend:8000/"
      : "http://localhost:8000/",
  },
};

module.exports = nextConfig;
