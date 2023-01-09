/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    KEY: "uEKBcN7kMKayW6SF8d0BtaJq60Musbp0",
    VECTOR: "hA7wB3e4v87ihj6R",
  },
};

module.exports = nextConfig;
