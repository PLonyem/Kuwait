import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B5E20',
        secondary: '#C9A227',
        cta: '#25D366',
        background: '#FFFFFF',
        lightBg: '#F5F5F5',
        text: '#212121',
        accent: '#E8D5B7'
      },
      fontFamily: {
        arabic: ['var(--font-cairo)', 'sans-serif'],
        english: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
