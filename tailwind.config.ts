import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#03060D',
        panel: '#0A111E',
        accent: '#1E5BFF',
        muted: '#9AA4B2',
        border: '#19263A'
      },
      boxShadow: {
        glow: '0 0 20px rgba(30, 91, 255, 0.24)'
      }
    }
  },
  plugins: []
};

export default config;
