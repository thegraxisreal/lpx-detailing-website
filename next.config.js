/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nicepng.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org'
      }
    ]
  }
};

module.exports = nextConfig;
