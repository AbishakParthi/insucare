/**
 * Single source of truth for the InsuCARE production website URL and canonical SEO.
 * Canonical preferred domain: https://insucareindia.vercel.app
 */

export const PRODUCTION_SITE_URL = "https://insucareindia.vercel.app";

export const OLD_SITE_DOMAIN = "insucare-platform-web.vercel.app";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || PRODUCTION_SITE_URL;

/**
 * Generates an absolute URL using the canonical site origin.
 * @param path Optional relative path (e.g., "/about" or "services/health-insurance")
 * @returns Fully qualified absolute URL (e.g., "https://insucareindia.vercel.app/about")
 */
export function absoluteUrl(path: string = ""): string {
  if (!path || path === "/") {
    return SITE_URL;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
