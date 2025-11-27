/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        github: {
          dark: "#0d1117",
          darker: "#010409",
          surface: "#161b22",
          border: "#30363d",
          muted: "#6e7681",
        },
      },
    },
  },
  plugins: [],
};
