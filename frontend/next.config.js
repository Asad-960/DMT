/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dmt.com', 'api.dmt.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
