import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Public site URL used for canonical/Open Graph tags, robots.txt and sitemap.xml.
 * Social platforms need absolute image URLs, so this matters for link previews.
 *
 * Order: SITE_URL (set this once you have a custom domain) → Vercel's production
 * domain (exposed to builds automatically) → Vercel's deployment URL (previews).
 */
function resolveSiteUrl(): string {
  const env = process.env;
  const raw =
    env.SITE_URL ||
    (env.VERCEL_ENV === 'production' && env.VERCEL_PROJECT_PRODUCTION_URL) ||
    env.VERCEL_URL ||
    env.VERCEL_PROJECT_PRODUCTION_URL ||
    '';
  if (!raw) return '';
  return (raw.startsWith('http') ? raw : `https://${raw}`).replace(/\/+$/, '');
}

function seo(): Plugin {
  const siteUrl = resolveSiteUrl();
  return {
    name: 'lbsaa-seo',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_URL%', siteUrl);
    },
    generateBundle() {
      if (!siteUrl) {
        this.warn('SITE_URL is not set: link previews will use relative image URLs. Set SITE_URL or deploy on Vercel.');
      }
      const robots = ['User-agent: *', 'Allow: /', ''];
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`, '');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') });

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
});
