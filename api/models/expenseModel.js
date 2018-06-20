var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ExpenseSchema   = new Schema({
    user_id: Number,
    date: Date,
    type: Number,
    amount: Number,
    share_amount: Number,
    contribution: Array
}, { collection: 'expense' });

module.exports = mongoose.model('Expense', ExpenseSchema);


