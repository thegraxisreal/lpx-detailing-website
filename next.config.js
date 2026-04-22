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
        hostname: 'www.pngmart.com'
      }
    ]
  }
};

module.exports = nextConfig;
