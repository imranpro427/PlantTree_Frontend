/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        darkGreen: "#059212",
        brightGreen: "#06D001",
        pastelYellow: "#96fc92",
        mutedYellow: "#FAF7DC",
        grayBackground: "#F5F5F5",
        graphColor: "#03fc07",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
