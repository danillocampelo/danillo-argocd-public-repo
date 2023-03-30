const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com', //TODO: Remove this source
        port: '',
        pathname: '/content/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'media.omnibees.com', //TODO: Remove this source
        port: '',
        pathname: '/Images/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
