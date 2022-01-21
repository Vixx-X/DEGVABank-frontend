module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#393939",
        light: "#EEEEEE",
        primary: "#2F80ED",
        secundary: "#048C7E",
      },
      fontFamily: {
        'montserrat' : ['Montserrat'],
        'lato': ['Lato'],
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};