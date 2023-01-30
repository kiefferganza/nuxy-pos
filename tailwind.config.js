module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js"',
  ],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      display: ['Poppins', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
}
