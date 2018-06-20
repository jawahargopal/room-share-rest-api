var express = require('express'), 
                reportRouter = express.Router(),                
                mongoose = require('mongoose'),
                Expense = require('../models/expenseModel');
reportRouter.route('/')
    .get((req, res) => {
      Expense.find({}, function(err, expenses) {
        if (err)
            res.send(err);
        var rent = 7800/4;
        var users = {
          1:{cr:0,dr:rent},
          2:{cr:0,dr:rent},
          3:{cr:0,dr:rent},
          4:{cr:0,dr:rent}
        }
        for(expense of expenses) {
          for (user in users) {
            if (expense.user_id == user) {
              users[user].cr += expense.amount;
            }
            if (expense.type === 1) {              
              users[user].dr += expense.share_amount;
            } else {
              if (expense.contribution.indexOf(user) > -1) {
                users[user].dr += expense.share_amount; 
              }
            }
          }   
        }
        res.json(users);
      });
    });


module.exports = reportRouter;