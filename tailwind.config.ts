import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        white: {
          0: "#fff",
        },
        gray: {
          50: "#E4E4E4",
          100: "#999999",
        },
        orange: {
          500: "#ff800b",
        },
        black: {
          800: "#141414",
        },
      },
    },
  },
  plugins: [],
};
export default config;
