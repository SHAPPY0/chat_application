var _ = require('lodash');
var userModel = require('../models/userModel');

setTimeout(function(){
var sockett = require('../../../sockets').io();
}, 3000);



var userServ = {
	userSignupService:function(options, cb){ 
		var newUser = new userModel(options);
		newUser.save(function(err, data){
			if(err) {
				return cb(err);
			}
			cb(null, data);
		})
	},

	userLoginService: function(options, cb){ 
		userModel.findOne({email:options.email},(err, result)=>{
			if(err) return cb(err);
			if(!result){
				return cb( 'No User Found');
			}
			if(result.password !== options.password){
				return cb('Password MissMatched')
			}; 
			cb(null, result)
		})
	},
	getUsersListService:(options, cb)=>{
		let query = {type:options.type}
		if(options.type == 0) query = {};
		userModel.find(query,(err, data)=>{
			if(err) return cb(err);
			cb(null, data);
		})
	}
};
module.exports = userServ;