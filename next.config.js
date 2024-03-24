const CRISPY_READ_CORE_BASE_URL = "http://crispyread.com:8080"
/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:["d2cg59g0calthe.cloudfront.net"]
  },
  output: 'standalone',
  async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${CRISPY_READ_CORE_BASE_URL}/api/:path*`,
			},
		]
	},
}

module.exports = nextConfig
