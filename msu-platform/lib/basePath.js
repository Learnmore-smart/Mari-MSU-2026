// Central basePath helper for subpath-safe links
import getConfig from 'next/config'

// Use process.env.NEXT_PUBLIC_BASE_PATH for client, or fallback to next.config.js
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/mari-msu-2026';
