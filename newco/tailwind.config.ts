import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Helvetica", "sans-serif"],
        secondary: ['var(--font-space_grotesk)', "monospace"],
      },
      colors: {
        primary: {
          default: "#1A2A4D",
          orange: "#F96A08",
          darkBlue: "#1A2A4D",
        },
        secondary: {
          default: "#F4FBFF",
          lightOrange: "#FB9C3E",
          blue: "#8EE2FF",
          lightBlue: "#F4FBFF",
          lightBlueAlt: "#D9E9F2"
        },
        tertiary: {
          red: "#EB0000",
          lightRed: "#FF8383",
          green: "#04865E",
          purple: "#920CFF",
          white: "#FFFFFF",
          black: "#1D1D1D",
        },
        alert: {
          red: "#EB0000",
          lightRed: "#FF8383",
          green: "#04865E",
          purple: "#920CFF"
        },
        neutral: {
          white: "#FFFFFF",
          black: "#1D1D1D",
          darkGray: "#1D1D1D",
          ivory: "#F1EEEA",
          transparentWhite: "#FFFFFF33"
        },
        lines: {
          white: "#FFFFFF",
          black: "#1D1D1D",
        },
      },
      spacing: {
        "0": "0px",
        "1": "8px",
        "1.5": "10px",
        "2": "12px",
        "3": "16px",
        "4": "20px",
        "5": "24px",
        "6": "32px",
        "7": "40px",
        "7.5": "44px",
        "8": "52px",
        "9": "72px",
        "10": "120px",
        "11": "130px",
        "12": "140px",
        "13": "150px",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        md: "17px",
        lg: "18px",
        xl: "20px",
        overline: "21px",
        "2xl": "24px",
        "3xl": "30px",
        "4xl": "36px",
        "5xl": "48px",
      },
      screens: {
        sm: "640px",
        md: "770px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
export default config;
