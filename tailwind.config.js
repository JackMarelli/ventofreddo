/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "340px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      sans: ["Roboto Mono"],
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#1e1e1e",
        },
        primary: {
          DEFAULT: "#ffffff",
        },
        secondary: {
          DEFAULT: "#5c5c5c",
        },
        accent: {
          DEFAULT: "#ffffff",
          success: "#74E262",
          error: "#F92929",
        },
      },
    },
  },
  plugins: [],
};
