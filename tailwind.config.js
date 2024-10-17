/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ], theme: {
    fontFamily: {
      sans: ['Roboto Mono'],
    },
    extend: {
      colors: {
        light: {
          DEFAULT: "#ffffff",
        },
        gray: {
          DEFAULT: "#777777",
          "333": "333333",
        },
        dark: {
          DEFAULT: "#000000",
        },
        accent: {
          DEFAULT: "#ff2ce3",
        },
      },
    },
  },
  plugins: [],
}

