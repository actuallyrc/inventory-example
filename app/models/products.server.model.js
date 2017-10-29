'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * Products Schema
 */
var ProductsSchema = new Schema({
	name: {
		type: String,
		required: 'Please fill in product name',
		trim: true
	},
    productId: {
		type: String,
		unique: 'This product id is already in use',
		required: 'Please fill in product id',
		trim: true
	},
    productType: {
		type: String,
		required: 'Please select in product type',
		trim: true
	},
    price: {
		type: Number,
		required: 'Please select in price'
	},
    image: {
		type: String,
		required: 'Please select in image',
		trim: true
	},
    quantity: {
		type: Number,
		required: 'Please select in quantity'
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Products', ProductsSchema);