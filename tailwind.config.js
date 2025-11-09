/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        crimson: {
       50:  '#fdf2f5',
    100: '#fbe5ea',
    200: '#f7ccd5',
    300: '#f2a3b3',
    400: '#eb7389',
    500: '#e04b64',
    600: '#c73551',
    700: '#a82a45',
    800: '#861b37',
    900: '#931039', // base color
    950: '#5a0b24',
    },
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'float-y': 'float-y 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
      },
    },
  },
  plugins: [],
};
