/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customGreen: '#A0DB10',
        customGray: '#575757',
        customRed: '#FF0000'
      }
    }
  },
  plugins: []
}
