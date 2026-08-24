/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the development cache separate from production builds.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  experimental: {
    serverComponentsExternalPackages: ["pg"],
  },
};

export default nextConfig;
