/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co", // Correct hostname
        // Remove port and pathname if not necessary
      },
    ],
    dangerouslyAllowSVG: true, // Add this line to allow SVG images
  },
};

module.exports = nextConfig;
