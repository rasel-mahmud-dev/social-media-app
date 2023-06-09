/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#4374e8"
        }
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require("flowbite/plugin")
  ],
}