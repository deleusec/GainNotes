/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        unineuebook: ["Uni Neue Book", "sans-serif"],
        unineuebold: ["Uni Neue Bold", "sans-serif"],
      }
    },
  },
  plugins: [],
}
