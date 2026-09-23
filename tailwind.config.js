/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gb: {
          primary: '#0f2647',
          yellow: '#fec200',
          dark: '#121212',
          gray: '#f8f9fa',
          muted: '#6c757d',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      },
    },
  },
  plugins: [],
};
