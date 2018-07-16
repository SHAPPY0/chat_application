'use strict';
//var mongoose = require('mongoose');
const db = require('../config/db');

module.exports = (app)=>{
	require('./users/routes')(app); 


	db.mongoose.connection.on('connected', (err)=> {
		if(err){
			console.log('Error in Mongoose COnnecrion')
		}else{
			console.log('Mongoose is connected');
		}
	})
}
