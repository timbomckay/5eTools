/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const themeDir = `${__dirname}`;

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './layouts/**/*.html',
  ],
});

module.exports = {
  plugins: [
    require('postcss-import')({ path: [`${themeDir}/assets/`] }),
    require('tailwindcss')(`${themeDir}/tailwind.config.js`),
    ...process.env.HUGO_ENVIRONMENT === 'production'
      ? [purgecss]
      : [],
  ],
};
