/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 색상
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
      },
    },
  },
  plugins: [],
};
