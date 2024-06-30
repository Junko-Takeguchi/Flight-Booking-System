/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      fontSize: {
        'h1': ['64px', '96px'],
        'h2': ['48px', '72px'],
        'h3': ['32px', '48px'],
        'title': ['24px', '36px'],
        'b1': ['20px', '30px'],
        'b2': ['16px', '24px'],
        'b3': ['14px', '22px'],
        'caption': ['12px', '18px'],
      },
      colors: {
        yellow: {
          DEFAULT: '#FDA50F',
          dark: '#F09700',
        },
        pink: {
          light: '#F3F0EA',
          DEFAULT: '#F0EBE4',
        },
        black: '#303131',
      },
      gradientColorStops: {
        'gradient-yellow': ['#FDA50F', '#F09700'],
      },
    },
  },
  plugins: [],
}
