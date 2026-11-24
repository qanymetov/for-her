/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#fff0f2',
        graphite: '#ffffff',
        ash: '#ffe4ea',
        milk: '#4a1028',
        warm: '#8c4a5e',
        gold: '#e11d5c',
        goldsoft: '#d0175a',
        coral: '#ff7a59',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        marquee: ['Oswald', 'Impact', 'sans-serif'],
        script: ['"Marck Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
