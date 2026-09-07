// Single source of truth for site identity.
// Canonical/metadata/OG/sitemap/robots all derive from SITE_URL.
// Per-deployment override (Cloudflare/CI):
//   env CURRENT_SITE_DOMAIN=www.example.com   (scheme optional)
export const SITE_NAME = 'Lagunas de Zempoala National Park';
const DEFAULT_DOMAIN = 'www.zempoalanationalpark.com';

function resolveSiteUrl(): string {
  const raw = process.env.CURRENT_SITE_DOMAIN;
  if (raw) {
    const trimmed = raw.trim().replace(/\/+$/, '');
    if (trimmed) return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
  }
  return `https://${DEFAULT_DOMAIN}`;
}

export const SITE_URL = resolveSiteUrl();
