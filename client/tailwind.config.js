/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        dark: "#0c0d0f",
        darkLight: "#1a1b1f",
        darkBorder: "#2c2d32",
      },
    },
  },
  plugins: [],
};
