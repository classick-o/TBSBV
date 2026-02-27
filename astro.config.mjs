// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tbsbv.com',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/cookie-policy') &&
        !page.includes('/privacy-policy') &&
        !page.includes('/terms-and-conditions'),
      serialize(item) {
        if (item.url === 'https://tbsbv.com/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/services/') && !item.url.endsWith('/services/')) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (item.url.endsWith('/services/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/insights/') && !item.url.endsWith('/insights/')) {
          item.priority = 0.8;
          item.changefreq = 'yearly';
        } else if (item.url.endsWith('/insights/')) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
