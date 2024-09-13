/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      color_1:'#1B1D1F',
      color_2:'#282B30',
      color_3:'#4E80EE',
      color_4:'#6C727F',
      color_5:'#D2D5DA',
    },
    fontFamily: {
      sans: ['Be Vietnam Pro', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

