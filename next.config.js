/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chatgpt.com'
      },
      {
        protocol: 'https',
        hostname: 'www.nicepng.com'
      }
    ]
  }
};

module.exports = nextConfig;
