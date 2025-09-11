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
        source: '/soccer',
        destination: '/streams/soccer',
        permanent: true, // 301 redirect
      },
      {
        source: '/cricket',
        destination: '/streams/cricket',
        permanent: true, // 301 redirect
      },
      {
        source: '/motogp',
        destination: '/streams/motogp',
        permanent: true, // 301 redirect
      },
      {
        source: '/f1',
        destination: '/streams/f1',
        permanent: true, // 301 redirect
      },
      {
        source: '/nba',
        destination: '/streams/nba',
        permanent: true, // 301 redirect
      },
      {
        source: '/nfl',
        destination: '/streams/nfl',
        permanent: true, // 301 redirect
      },
      {
        source: '/mlb',
        destination: '/streams/mlb',
        permanent: true, // 301 redirect
      },
      {
        source: '/nhl',
        destination: '/streams/nhl',
        permanent: true, // 301 redirect
      },
      {
        source: '/ufc',
        destination: '/streams/ufc',
        permanent: true, // 301 redirect
      },
      {
        source: '/wwe',
        destination: '/streams/wwe',
        permanent: true, // 301 redirect
      },
      {
        source: '/boxing',
        destination: '/streams/boxing',
        permanent: true, // 301 redirect
      },
      {
        source: '/tennis',
        destination: '/streams/tennis',
        permanent: true, // 301 redirect
      },
      {
        source: '/rugby',
        destination: '/streams/rugby',
        permanent: true, // 301 redirect
      },
      {
        source: '/blog',
        destination: '/streams/blog',
        permanent: true, // 301 redirect
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
