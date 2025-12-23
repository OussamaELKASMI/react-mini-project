/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        prim: '#F4F7F7', // primary
        sec: '#AACFD0', // secondary
      },
    },
  },
  plugins: [],
};
