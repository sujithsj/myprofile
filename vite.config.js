import { defineConfig } from 'vite';

// Relative asset URLs work on both root domains and repository subpaths.
// Commit docs/ to publish on GitHub Pages without a Node build on the host.
export default defineConfig({
  base: './',
  build: { outDir: 'docs' },
});
