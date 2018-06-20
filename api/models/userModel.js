var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    mobile: String
}, { collection: 'user' });

module.exports = mongoose.model('User', UserSchema);


