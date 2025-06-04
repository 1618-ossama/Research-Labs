/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    RUST_BACKEND_URL: process.env.NEXT_PUBLIC_RUST_BACKEND_URL,
  },
};

module.exports = nextConfig;
