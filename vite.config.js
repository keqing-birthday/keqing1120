import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function injectFontDisplaySwap() {
  return {
    name: 'inject-font-display-swap',
    enforce: 'post',
    transform(code, id) {
      if (!id.includes('LXGWNeoZhiSong/result.css')) return null;
      if (code.includes('font-display')) return null;
      return code.replace(/(@font-face\s*\{)/g, '$1\n  font-display: swap;');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    injectFontDisplaySwap(),
  ],
  base: '/',
  server: {
    watch: {
      ignored: ['**/*.zip', 'public/music/**', '**/node_modules/**', '**/dist/**'],
    },
  },
});
