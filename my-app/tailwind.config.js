/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#253439',
        'beige': '#b29e84',
        'light-gray': '#f6f4f1',
        'light-yellow': '#fbee0f',
        'gold-yellow': '#fbb80f',
        'dark-gray': '#7c898b',
        'vivid-red': '#ff0000',
        'bright-red': '#ff3131',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

