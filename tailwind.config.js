/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: ["retro"],
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

