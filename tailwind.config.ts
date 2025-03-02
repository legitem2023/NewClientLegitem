
//import type { Config } from "tailwindcss";
//const defaultTheme = require('tailwindcss/defaultTheme')
//const withMT = require("@material-tailwind/html/utils/withMT");

//export default withMT({
//  content: [
//    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//  ],
//  theme: {
 //   extend: {
 //     colors: {
//        background: "var(--background)",
//        foreground: "var(--foreground)",
//      },
//      fontFamily: {
//        sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
//      },
//    },
//  }
//}) satisfies Config;




import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
