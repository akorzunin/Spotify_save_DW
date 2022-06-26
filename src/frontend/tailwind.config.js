/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/*.html",
    "./src/frontend/static/css/styles.css",
    "./src/frontend/static/scripts/bundle.js",
    "./src/frontend/src/**/*.{ts,js,tsx,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
