var express = require('express'), 
                expenseRouter = express.Router(),                
                mongoose = require('mongoose'),
                Expense = require('../models/expenseModel');

expenseRouter.use(function (req, res, next) {
    console.log('expense');
    if (res) {
        console.log('ccc');
    }
    next();
});
                  

expenseRouter.route('/')
    .get((req, res) => {
        Expense.find({}, (err, expenses) => {
            res.json(expenses)
    })  
    })    
    .post((req, res) => {
        if (req.body.type === 1) {
            req.body.share_amount = req.body.amount / 4;
        } else {
            req.body.share_amount = req.body.amount / (req.body.contribution.length+1);
        }
        var expense = new Expense();
        expense.user_id = req.body.user_id;
        expense.date = new Date();
        expense.type = req.body.type;
        expense.amount = req.body.amount; 
        expense.share_amount = req.body.share_amount;
        expense.contribution = req.body.contribution;
        
        expense.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: req.body });
        });
    });

expenseRouter.route('/:expense_id')
    .get((req, res) => {
      Expense.findById(req.params.expense_id, function(err, expense) {
        if (err)
            res.send(err);
        res.json(expense);
      });
    })
    .put((req, res) => {
        Expense.findById(req.params.expense_id, function(err, expense) {
          if (err)
              res.send(err);

            expense.user_id = req.body.user_id;
            expense.date = req.body.date;
            expense.type = req.body.type;
            expense.amount = req.body.amount;  

            expense.save(function(err) {
            if (err)
                res.send(err);

             res.json({ message: 'Expense updated!' });
            });
        });
      })
      .delete((req, res) => {
        Expense.findById(req.params.expense_id, function(err, expense) {
          if (err)
              res.send(err);
         Expense.remove({
                _id: req.params.expense_id
            }, function(err, expense) {
                if (err)
                    res.send(err);
    
                res.json({ message: req.params.expense_id });
            });
        });
      });

module.exports = expenseRouter;