var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	}
});

userSchema.methods.validatePassword = function(password, cb){
	bcrypt.compare(password, this.password, function(err, isValid){
		if(err) {
			cb(err);
			return;
		}
		cb(null, isValid);
	});
};

var User = mongoose.model('User', userSchema);

module.exports = User;
		