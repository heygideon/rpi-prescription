import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import Forms from "@tailwindcss/forms";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree Variable", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "safe-area-t": "var(--safe-area-inset-top)",
        "safe-area-r": "var(--safe-area-inset-right)",
        "safe-area-b": "var(--safe-area-inset-bottom)",
        "safe-area-l": "var(--safe-area-inset-left)",
      },
    },
  },
  plugins: [Forms],
} satisfies Config;
