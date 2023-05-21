/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["links.papareact.com", "fakestoreapi.com", "https://assets.stickpng.com"],
    },
    experimental: {
        appDir: true
    },
    env: {
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
