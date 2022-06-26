/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/*.html",
    "./src/frontend/static/css/styles.css",
    "./src/**/*.{ts, }",
    "./src/**/*.{tsx, }",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
