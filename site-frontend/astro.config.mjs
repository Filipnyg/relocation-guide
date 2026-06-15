import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://relocation-guide.pages.dev',
  integrations: [sitemap()]
});