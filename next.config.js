const withCSS = require('@zeit/next-css');
module.exports = withCSS({
  cssLoaderOptions: {
    importLoaders: 1,
  },
});
