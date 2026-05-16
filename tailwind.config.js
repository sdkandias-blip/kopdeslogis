/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-fixed-dim": "#bec6e0",
        "on-tertiary": "#ffffff",
        "surface-variant": "#e4e2e4",
        "on-background": "#1b1b1d",
        "on-secondary": "#ffffff",
        "on-surface": "#1b1b1d",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#6ffbbe",
        "inverse-surface": "#303032",
        "surface-container": "#f0edef",
        "on-surface-variant": "#45464d",
        "surface-container-highest": "#e4e2e4",
        "outline": "#76777d",
        "on-secondary-fixed": "#00210b",
        "secondary-container": "#a4f1b2",
        "inverse-on-surface": "#f3f0f2",
        "secondary": "#1f6c3a",
        "secondary-fixed": "#a6f4b5",
        "inverse-primary": "#bec6e0",
        "surface-container-low": "#f6f3f5",
        "on-secondary-container": "#24703e",
        "on-tertiary-fixed": "#002113",
        "tertiary": "#000000",
        "tertiary-container": "#002113",
        "surface-tint": "#565e74",
        "secondary-fixed-dim": "#8bd79b",
        "outline-variant": "#c6c6cd",
        "surface-bright": "#fcf8fa",
        "on-error": "#ffffff",
        "on-primary-fixed-variant": "#3f465c",
        "background": "#fcf8fa",
        "on-error-container": "#93000a",
        "on-tertiary-container": "#009668",
        "on-primary-fixed": "#131b2e",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#005226",
        "on-tertiary-fixed-variant": "#005236",
        "surface-dim": "#dcd9db",
        "on-primary-container": "#7c839b",
        "on-primary": "#ffffff",
        "primary-fixed": "#dae2fd",
        "surface": "#fcf8fa",
        "primary-container": "#131b2e",
        "tertiary-fixed-dim": "#4edea3",
        "surface-container-high": "#eae7e9",
        "primary": "#000000",
        // Shadcn UI colors
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        foreground: "var(--foreground)",
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        }
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "container-padding": "24px",
        "gutter": "20px",
        "base": "8px",
        "bento-gap": "24px"
      },
      fontFamily: {
        "display-lg": ["Plus Jakarta Sans"],
        "label-md": ["Inter"],
        "headline-lg": ["Plus Jakarta Sans"],
        "body-lg": ["Inter"],
        "headline-md": ["Plus Jakarta Sans"],
        "body-md": ["Inter"],
        "label-sm": ["Inter"]
      },
      fontSize: {
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "label-md": ["14px", {"lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
        "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "label-sm": ["12px", {"lineHeight": "16px", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}
