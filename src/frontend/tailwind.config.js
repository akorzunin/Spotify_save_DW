/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/*.html",
    "./static/scripts/bundle.js",
    // "./src/**/*.{ts, }",
    // "./src/**/*.{tsx, }",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
