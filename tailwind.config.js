/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f8ff',
          100: '#e9f1ff',
          200: '#c7d9ff',
          300: '#96b8ff',
          400: '#6690ff',
          500: '#3366ff',
          600: '#1947e5',
          700: '#1335b8',
          800: '#0f2a8c',
          900: '#0c1f66',
        },
        accent: {
          50: '#fdf2ff',
          100: '#f6e1ff',
          200: '#edc4ff',
          300: '#e299ff',
          400: '#d25fff',
          500: '#c033ff',
          600: '#a518e5',
          700: '#8211b8',
          800: '#610d8c',
          900: '#460966',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};