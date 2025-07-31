// pages/api/proxy/[...path].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow internal requests (optional)
  if (req.headers['x-internal-ui'] !== process.env.INTERNAL_UI_SECRET) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  return new Promise<void>((resolve, reject) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080', // Your backend
      changeOrigin: true,
    }, (err) => {
      reject(err);
    });

    proxy.on('proxyRes', () => resolve());
  });
}
