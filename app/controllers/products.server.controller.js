'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('./errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
    path = require('path'),
	fs = require('fs'),
    crypto = require('crypto'),
    multiparty = require('multiparty'),
	Products = mongoose.model('Products');

/**
 * Get list of all products.
 */
exports.list = function(req, res) {
	Products.find().exec(function (error, products) {
		if(error) {
			return res.status(400).send({message: errorHandler.getErrorMessage(error)});
		} else {
			res.status(200).send(products);
		}
    });
};

/**
 * Create product.
 */
exports.create = function(req, res) {
	var product = new Products(req.body);
    product.save(function (error, product) {
        if(error) {
            return res.status(400).send({message: errorHandler.getErrorMessage(error)});
        } else {
            res.status(200).send({message: 'Product created successfully'});
        }
    });
};

/**
 * Save Product Image.
 */
exports.saveImage = function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var file = files.file[0];
        var fileName = file.path.split('.');
        var fileExt = fileName[fileName.length - 1];
        crypto.randomBytes(20, function (err, buffer) {
            var token = buffer.toString('hex');
            var tmp_path = file.path,
                targetPath = path.resolve('./public/images') + '/' + token + '.' + fileExt;
            if (!fs.existsSync(path.resolve('./public/images'))) {
                fs.mkdirSync(path.resolve('./public/images'));
            }
            fs.rename(tmp_path, targetPath, function (err) {
                if (err) {
                    return res.status(400).send({message: errorHandler.getErrorMessage(err)});
                } else {
                    fs.unlink(tmp_path, function () {
                    });
                    res.status(200).send({
                        'image': token + '.' + fileExt
                    });
                }
            });
        });
    });
};
