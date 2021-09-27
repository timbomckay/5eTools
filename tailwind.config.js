// const defaultTheme = require('tailwindcss/defaultTheme');
// Shades & Tints generator: https://javisperez.github.io/tailwindcolorshades/#/?primary=1169D3&tv=1

module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#F3F8FD',
          100: '#E7F0FB',
          200: '#C4DAF4',
          300: '#A0C3ED',
          400: '#5896E0',
          500: '#1169D3',
          600: '#0F5FBE',
          700: '#0A3F7F',
          800: '#082F5F',
          900: '#05203F',
        },
        'secondary': {
          50: '#F8FCF6',
          100: '#F2FAEC',
          200: '#DEF2D0',
          300: '#CAE9B4',
          400: '#A2D97B',
          500: '#7AC943',
          600: '#6EB53C',
          700: '#497928',
          800: '#375A1E',
          900: '#253C14',
        },
      },
      maxWidth: {
        ch: '72ch'
      },
      screens: {
        'print': { 'raw': 'print' },
      },
    },
    screens: {
      sm: `${640/16}rem`, // => @media (min-width: 40rem) { ... }
      md: `${768/16}rem`, // => @media (min-width: 48rem) { ... }
      lg: `${1024/16}rem`, // => @media (min-width: 64rem) { ... }
      xl: `${1280/16}rem`, // => @media (min-width: 80rem) { ... }
    },
  },
  variants: {
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last'],
  },
  plugins: [],
  corePlugins: {
    animation: false
  }
}
