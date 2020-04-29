const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	_id      : mongoose.Schema.Types.ObjectId,
	email    : {
		type     : String,
		required : true,
		unique   : true,
		match    : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password : { type: String, required: true },
	name     : { type: String, required: true },
	cart     : [
		{ name: String, quantity: Number, itemId: Number, price: Number, imageUrl: String }
	]
});

module.exports = mongoose.model('Users', userSchema);
