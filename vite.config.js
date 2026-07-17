import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import path from 'node:path';

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

function kebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-z])(\d)/g, '$1-$2')
    .toLowerCase();
}

function flattenVars(obj, prefix = '') {
  const vars = [];
  for (const [key, value] of Object.entries(obj)) {
    const cssKey = prefix ? `${prefix}-${kebabCase(key)}` : kebabCase(key);
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      vars.push(...flattenVars(value, cssKey));
    } else if (!Array.isArray(value)) {
      // 只把标量值（字符串、数字）转成 CSS 变量；数组由组件直接 import 使用
      vars.push(`  --${cssKey}: ${value};`);
    }
  }
  return vars;
}

function loadThemeConfig() {
  const filePath = path.resolve('src/config/theme.js');
  const code = readFileSync(filePath, 'utf-8');
  const match = code.match(/export\s+const\s+themeConfig\s*=\s*(\{[\s\S]*?\n\});\s*$/);
  if (!match) {
    throw new Error('无法在 src/config/theme.js 中找到 themeConfig 导出');
  }
  const fn = new Function(`return (${match[1]});`);
  return fn();
}

function generateThemeCSS() {
  const config = loadThemeConfig();
  const lightVars = flattenVars(config.colors.light);
  const darkVars = flattenVars(config.colors.dark);
  const homeVars = config.home ? flattenVars(config.home, 'home') : [];
  const effectsVars = config.effects ? flattenVars(config.effects, 'effects') : [];

  return [
    '/* 由 src/config/theme.js 自动生成，请勿直接编辑 */',
    ':root {',
    ...lightVars,
    ...homeVars,
    ...effectsVars,
    `  --font-title: ${config.fonts.title.join(', ')};`,
    `  --font-body: ${config.fonts.body.join(', ')};`,
    '}',
    '',
    '.dark {',
    ...darkVars,
    '}',
  ].join('\n');
}

function injectThemeVariables() {
  const cssPath = path.resolve('src/index.css').replace(/\\/g, '/');
  return {
    name: 'inject-theme-variables',
    enforce: 'pre',
    transform(code, id) {
      const normalizedId = id.split('?')[0].replace(/\\/g, '/');
      if (normalizedId !== cssPath) return null;
      const themeCSS = generateThemeCSS();
      // 将生成的变量插入到 @import 之后、@tailwind 之前，避免 @import 失效
      const tailwindIdx = code.indexOf('@tailwind base');
      if (tailwindIdx === -1) {
        return `${themeCSS}\n\n${code}`;
      }
      return `${code.slice(0, tailwindIdx)}${themeCSS}\n\n${code.slice(tailwindIdx)}`;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    injectThemeVariables(),
    injectFontDisplaySwap(),
  ],
  base: '/',
  server: {
    watch: {
      ignored: ['**/*.zip', 'public/music/**', '**/node_modules/**', '**/dist/**'],
    },
  },
});
