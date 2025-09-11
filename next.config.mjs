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
        source: '/category/uploads/:path*',
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
        source: '/soccer',
        destination: '/streams/soccer',
      },
      {
        source: '/cricket',
        destination: '/streams/cricket',
      },
      {
        source: '/motogp',
        destination: '/streams/motogp',
      },
      {
        source: '/f1',
        destination: '/streams/f1',
      },
      {
        source: '/nba',
        destination: '/streams/nba',
      },
      {
        source: '/nfl',
        destination: '/streams/nfl',
      },
      {
        source: '/mlb',
        destination: '/streams/mlb',
      },
      {
        source: '/nhl',
        destination: '/streams/nhl',
      },
      {
        source: '/ufc',
        destination: '/streams/ufc',
      },
      {
        source: '/wwe',
        destination: '/streams/wwe',
      },
      {
        source: '/boxing',
        destination: '/streams/boxing',
      },
      {
        source: '/tennis',
        destination: '/streams/tennis',
      },
      {
        source: '/rugby',
        destination: '/streams/rugby',
      },
      {
        source: '/blog',
        destination: '/streams/blog',
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
