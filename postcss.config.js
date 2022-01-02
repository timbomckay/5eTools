/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const themeDir = `${__dirname}`;

module.exports = {
  plugins: [
    require('postcss-import')({ path: [`${themeDir}/assets/`] }),
    require('tailwindcss')(`${themeDir}/tailwind.config.js`),
  ],
};
