/** @type {import('tailwindcss').Config} */
import { themeConfig } from './src/config/theme.config.js';

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        keqing: themeConfig.brand,
      },
      fontFamily: {
        title: themeConfig.fonts.title,
        body: themeConfig.fonts.body,
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
};
