import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        base: '#030712',
        panel: '#0a0f1a',
        surface: '#111827',
        'txt-primary': '#f1f5f9',
        'txt-secondary': '#94a3b8',
        'txt-muted': '#475569',
        'nova-blue': '#2563eb',
        'nova-blue-light': '#3b82f6',
        'nova-blue-dark': '#1d4ed8',
        'nova-orange': '#f97316',
        'nova-orange-light': '#fb923c',
        'nova-green': '#16a34a',
        'nova-green-light': '#22c55e',
      },
    },
  },
  plugins: [],
};
export default config;
