/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#E2231A",
          dark: "#B71C14",
          light: "#FDE7E5",
        },
        ink: {
          DEFAULT: "#00295E",
          soft: "#3D5A8A",
        },
        cream: "#FFFFFF",
        success: "#2F9E58",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
