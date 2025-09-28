import type { Config } from "tailwindcss";
    import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";
import tailwindcssForms from "@tailwindcss/forms";
import tailwindcssAspectRatio from "@tailwindcss/aspect-ratio";
import tailwindcssContainerQueries from "@tailwindcss/container-queries";
import tailwindScrollbar from "tailwind-scrollbar";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
            "sans": [
                  "\"Source Sans Pro\"",
                  "ui-sans-serif",
                  "system-ui",
                  "sans-serif"
            ],
            "heading": [
                  "\"Montserrat\"",
                  "ui-sans-serif",
                  "system-ui",
                  "sans-serif"
            ],
            "mono": [
                  "\"IBM Plex Mono\"",
                  "ui-monospace",
                  "monospace"
            ]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `0.375rem`,
        md: `calc(0.375rem - 2px)`,
        sm: `calc(0.375rem - 4px)`,
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        sm: `0 1px 2px rgba(0, 0, 0, 0.05)`,
        md: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
        lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
      },
    },
  },
 	plugins: [ tailwindcssAnimate,
		tailwindcssTypography,
		tailwindcssForms,
		tailwindcssAspectRatio,
		tailwindcssContainerQueries,
		tailwindScrollbar({ nocompatible: true }),],
};

export default config;