/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Raleway: ["Raleway", "serif"],
        Roboto: ["Roboto", "sans-serif"],
        Special: ['Special Elite', 'cursive'],
        Plus: ['Plus Jakarta Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}
