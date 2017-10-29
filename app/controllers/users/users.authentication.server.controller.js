'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;
			if(user.roles[0] =='admin') {
                req.login(user, function(err) {
                    if (err) {
                        return res.status(400).send({message: errorHandler.getErrorMessage(err)});
                    } else {
                        res.json(user);
                    }
                });
			} else {
                return res.status(400).send({message: 'Unauthorized Access'});
			}
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
