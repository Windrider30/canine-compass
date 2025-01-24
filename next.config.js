/** @type {import('next').NextConfig} */
    const nextConfig = {
      reactStrictMode: true,
      images: {
        domains: ['cdn2.thedogapi.com', 'pixabay.com'],
      },
      experimental: {
        serverActions: true,
      },
    }

    module.exports = nextConfig
