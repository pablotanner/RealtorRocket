/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,vue,ts,tsx}',
    './components/**/*.{js,jsx,vue,ts,tsx}',
    './app/**/*.{js,jsx,vue,ts,tsx}',
    './src/**/*.{js,jsx,vue,ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontWeight: {
      "100": "100",
      "200": "200",
      "300": "300",
      "400": "400",
      "500": "500",
      "600": "600",
      "700": "700",
      "800": "800",
      "900": "900",
    },
    fontFamily: {
      // Set roboto as the default sans-serif font.
      sans: ["Outfit Variable", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        "background-blue": "#f6f8ff",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "off-black": "var(--off-black)",
        "primary-dark": "hsl(var(--primary-dark))",
        "primary-text-light": "#8c92af",
        "primary-text-dark": "#6c7391",
        "background-gray": "#F6F6F6",
        "background-gray-darker": "#F4F4F4",
        "primary-darker": "hsl(var(--primary-darker))",
        "primary-darkest": "hsl(var(--primary-darkest))",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}