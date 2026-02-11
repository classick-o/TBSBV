// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://classick-o.github.io',
  base: '/TBSBV',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
