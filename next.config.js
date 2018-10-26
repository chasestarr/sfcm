const withCSS = require('@zeit/next-css');
const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

module.exports = withCSS({
  cssLoaderOptions: {
    importLoaders: 1,
  },
  exportPathMap: async function(defaultPathMap) {
    const data = await client.getEntries({
      content_type: 'landmark',
      order: '-sys.createdAt',
    });

    const landmarks = data.items.map(item => item.fields.slug).reduce((acc, cur) => {
      acc[`/${cur}`] = { page: '/landmark', query: { slug: cur } };
      return acc;
    }, {});

    return {
      '/': { page: '/' },
      '/add': { page: '/add' },
      ...landmarks,
    };
  },
});
