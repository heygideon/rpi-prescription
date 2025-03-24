import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import Forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [Forms],
} satisfies Config;
