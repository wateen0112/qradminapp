/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: [`src/**/*.{vue,js,scss}`],
  theme: {
    extend: {
      colors: {
        primary: "#FFCC00",
        danger: "#dc3545",
      },
    },
  },
  plugins: [],
};
