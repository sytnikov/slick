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
    ],
  },
};

module.exports = nextConfig;
