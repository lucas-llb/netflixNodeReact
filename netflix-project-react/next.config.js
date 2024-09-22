/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint:{
        ignoreDuringBuilds: true,
    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL
    }
}

module.exports = nextConfig
