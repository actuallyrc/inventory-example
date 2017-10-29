'use strict';

module.exports = function(app) {
	// Root routing
	var products = require('../../app/controllers/products.server.controller');
	var users = require('../../app/controllers/users.server.controller');

	app.route('/api/products').get(users.requiresAdminLogin, products.list);

	app.route('/api/product').post(users.requiresAdminLogin, products.create);

	app.route('/api/files').post(users.requiresAdminLogin, products.saveImage);
};
