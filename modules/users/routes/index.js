'use strict';
const userCtrl = require('./users');
const mongoose  = require('mongoose');
const error 	   = require('../../error');



module.exports = function(app){

	app.route('/api/signup', error)
		.post(userCtrl.userSignupCtrl)
	app.route('/api/login', error)
		.put(userCtrl.userLoginCtrl)
	app.route('/api/users/:type', error)
		.get(userCtrl.getUsersCtrl)
}