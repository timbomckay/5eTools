const defaultTheme = require('tailwindcss/defaultTheme');
const { primary } = require('./assets/colors.js');
// Shades & Tints generator: https://javisperez.github.io/tailwindcolorshades/#/?primary=1169D3&tv=1

module.exports = {
  theme: {
    extend: {
      colors: {
        primary,
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
