/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        keqing: {
          purple: '#8a2be2',
          pink: '#da70d6',
          gold: '#ffd700',
          dark: '#0a0a1a',
          'dark-light': '#1a0a2e',
        }
      },
      fontFamily: {
        title: ['"LXGW Neo ZhiSong"', '"Noto Serif SC"', 'serif'],
        body: ['"LXGW WenKai Lite"', '"Noto Serif SC"', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      }
    },
  },
  plugins: [],
};