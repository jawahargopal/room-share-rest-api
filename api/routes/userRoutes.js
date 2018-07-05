var express = require('express'), 
                userRouter = express.Router(),                
                mongoose = require('mongoose'),
                User = require('../models/userModel');

userRouter.use(function (req, res, next) {
    next();
});
                  

userRouter.route('/')
    .get((req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
    })  
    })    
    .post((req, res) => {
        var user = new User();      
        user.name = req.body.name;
        user.mobile = req.body.mobile; 
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: req.body });
        });
    });

userRouter.route('/:user_id')
    .get((req, res) => {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
      });
    })
    .put((req, res) => {
        User.findById(req.params.user_id, function(err, user) {
          if (err)
              res.send(err);

          user.name = req.body.name; 
          user.mobile = req.body.mobile; 

            user.save(function(err) {
            if (err)
                res.send(err);

             res.json({ message: 'User updated!' });
            });
        });
      })
      .delete((req, res) => {
        User.findById(req.params.user_id, function(err, user) {
          if (err)
              res.send(err);
         User.remove({
                _id: req.params.user_id
            }, function(err, user) {
                if (err)
                    res.send(err);
    
                res.json({ message: req.params.user_id });
            });
        });
      });

module.exports = userRouter;