let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://dashgenius.space/api/v1/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'https://dashgenius.space/uploads/:path*',
      },
      {
        source: '/team/uploads/:path*',
        destination: 'https://dashgenius.space/uploads/:path*',
      },
      {
        source: '/game/uploads/:path*',
        destination: 'https://dashgenius.space/uploads/:path*',
      },
      {
        source: '/league/uploads/:path*',
        destination: 'https://dashgenius.space/uploads/:path*',
      },
      {
        source: '/blog/uploads/:path*',
        destination: 'https://dashgenius.space/uploads/:path*',
      },
      {
        source: '/streams/uploads/:path*',
        destination: 'https://dashgenius.space/uploads/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
      {
        source: '/team/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
      {
        source: '/game/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
      {
        source: '/league/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
      {
        source: '/blog/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
      {
        source: '/streams/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
      {
        source: '/streams/1/images/:path*',
        destination: 'https://dashgenius.space/images/:path*',
      },
    ];
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
