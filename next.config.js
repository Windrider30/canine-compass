/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn2.thedogapi.com', 'pixabay.com'],
  },
  experimental: {
    // Remove serverActions as they're enabled by default
  }
}

module.exports = nextConfig
