'use strict';
var mongoooseInst = require('mongoose').Mongoose;
var mongoose = new mongoooseInst();
var Schema = mongoose.Schema;
var pool;

function connect(){
	if(pool) return;
	var uri = 'mongodb://127.0.0.1:27017/sowil_test';

	 pool = mongoose.connect(uri, {server: {poolSize: 10}});



	// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	  console.log('Mongoose default connection error: ' + err);
	  process.exit(0);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	  console.log('Mongoose default connection disconnected'); 
	});
}
connect();



// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

module.exports = {
	mongoose:mongoose,
	Schema :Schema
}