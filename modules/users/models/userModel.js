const db = require('../../../config/db');

let userSchema = new db.Schema({
	firstname :{
		type:String,
		trim:true
	},
	lastname :{
		type:String
	},
	email:{
		type:String,
		unique:true,
		trim:true 
	},
	mobile:{
		type:String
	},
	password:{
		type:String,
	},
	online:{
		type:Boolean
	},
	type:{
		type:Number
	}
});

module.exports = db.mongoose.model('user', userSchema);