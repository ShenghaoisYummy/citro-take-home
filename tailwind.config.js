/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}'],
  darkMode: 'class', // Add class-based dark mode
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
