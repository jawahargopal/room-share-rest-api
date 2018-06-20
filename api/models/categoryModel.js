var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategorySchema   = new Schema({
    name: String
}, { collection: 'category' });

module.exports = mongoose.model('Category', CategorySchema);


