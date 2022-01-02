const defaultTheme = require('tailwindcss/defaultTheme');
// Shades & Tints generator: https://javisperez.github.io/tailwindcolorshades/#/?primary=1169D3&tv=1

module.exports = {
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === 'production',
    content: ['./layouts/**/*.html'],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf3f3',
          100: '#f5e7e7',
          200: '#e7c2c3',
          300: '#d89d9f',
          400: '#ba5456',
          500: '#9d0a0e',
          600: '#8d090d',
          700: '#76080b',
          800: '#5e0608',
          900: '#4d0507',
        },
      },
      maxWidth: {
        ch: '72ch',
      },
      screens: {
        print: { raw: 'print' },
      },
      fontFamily: {
        serif: [
          'Crimson Text',
          ...defaultTheme.fontFamily.serif,
        ],
      },
    },
    screens: {
      sm: `${640 / 16}rem`, // => @media (min-width: 40rem) { ... }
      md: `${768 / 16}rem`, // => @media (min-width: 48rem) { ... }
      lg: `${1024 / 16}rem`, // => @media (min-width: 64rem) { ... }
      xl: `${1280 / 16}rem`, // => @media (min-width: 80rem) { ... }
    },
  },
  variants: {
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last'],
  },
  plugins: [],
  corePlugins: {
    animation: false,
  },
};
