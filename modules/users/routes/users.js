'use strict';

const userServices = require('../service/usersServices');
const _ = require('lodash');

const userCtrl = {
	userSignupCtrl:(req, res, next)=>{
		let options = {};
		_.assign(options, req.body);
		userServices.userSignupService(options, function(err){
			if(err){ 
				return res.json({status:'F',msg:'Error to register user'});
			}
			res.json({status:'S',msg:"User regstered Successfully",data:options});
		})
	},
	userLoginCtrl: (req, res, next)=>{
		let options = {};
		_.assign(options, req.body); 
		userServices.userLoginService(options, function(err, result){
			if(err){
				return res.json({status:'F',msg:"Invalid Email & Password"});
			}
			res.json({status:'S',msg:'User Loggedin Successfully', data:result});
		})
	},
	getUsersCtrl: (req,res,next)=>{
		let options = {};
		_.assign(options, req.params); 
		userServices.getUsersListService(options, (err, result)=>{
			if(err){
				return new Error({msg:"No Users found"});
			}
			res.json({data:result});
		})
	}
};

module.exports = userCtrl;