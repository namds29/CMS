const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        10: "10%",
        13: "12%",
        95: "95%",
        200: "12.5rem"
      },
      height:{
        42: "2.625rem"
      },
      maxHeight: {
        600: "37.5rem",
      },
      ...colors,
    },
  },
  corePlugins: { preflight: false, },
  plugins: [],
}

