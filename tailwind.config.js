/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_site/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Cutive Mono', 'mono'],
        handwriting: ['Reenie Beanie', 'cursive']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

