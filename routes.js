const routes = (module.exports = require('next-routes')());

routes.add('/add', 'add');
routes.add('/:slug', 'landmark');
