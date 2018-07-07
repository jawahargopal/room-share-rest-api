var express = require('express'), 
                reportRouter = express.Router(),                
                mongoose = require('mongoose'),
                Expense = require('../models/expenseModel'),
                Users = require('../models/userModel');
                Constants = require('../constants');
reportRouter.route('/')
    .get((req, res) => {
      Expense.find({}, function(err, expenses) {
        if (err)
            res.send(err);
        var rent = Constants.ROOM_RENT/Constants.MEMBERS_COUNT;
        var users = {};
        Users.find({}, function(err, users_data) {
          for (user of users_data) {
            users[user._id] = {name:user.name,cr:0,dr:rent}
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

        });
        res.json(users);
      });
    });


module.exports = reportRouter;