/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['placeholder.com'], 
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:5000/api/:path*', // Proxy to Backend
        },
      ]
    },
  }
  
  module.exports = nextConfig