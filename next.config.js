const url = require("url");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "placehold.co",
      url.parse(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
