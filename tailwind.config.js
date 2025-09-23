/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        francois: ['var(--font-francois)', 'sans-serif'],
        sans: ['Open Sans', 'system-ui', 'sans-serif'], 
      },
      colors: {
        darkcustom: '#404040',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            h1: { fontWeight: "700", fontSize: theme("fontSize.3xl")[0] },
            h2: { fontWeight: "600", fontSize: theme("fontSize.2xl")[0] },
            h3: { fontWeight: "600", fontSize: theme("fontSize.xl")[0] },
            a: { color: theme("colors.blue.600"), textDecoration: "none" },
            "a:hover": { textDecoration: "underline" },
            img: { borderRadius: theme("borderRadius.lg") },
            blockquote: {
              fontStyle: "italic",
              borderLeft: `4px solid ${theme("colors.gray.300")}`,
              color: theme("colors.gray.700"),
              paddingLeft: "1rem",
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

