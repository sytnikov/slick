const url = require("url");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: url.parse(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
