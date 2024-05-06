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
        neutral: {
          0: "#fff",
          50: "#E4E4E4",
          100: "#999999",
          500: "#ff800b",
          800: "#141414",
        },
      },
    },
  },
  plugins: [],
};
export default config;
