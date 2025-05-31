/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["d2cg59g0calthe.cloudfront.net"],
  },
  publicRuntimeConfig: {
    crispyReadServiceUrl: process.env.crispyReadServiceUrl,
  },
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.CRISPY_READ_CORE_BASE_URL}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
