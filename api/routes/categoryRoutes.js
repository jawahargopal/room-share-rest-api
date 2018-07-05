var express = require('express'), 
                categoryRouter = express.Router(),                
                mongoose = require('mongoose'),
                Category = require('../models/categoryModel');

categoryRouter.use(function (req, res, next) {
    next();
});
                  

categoryRouter.route('/')
    .get((req, res) => {
        Category.find({}, (err, categories) => {
            res.json(categories)
    })  
    })    
    .post((req, res) => {
        var category = new Category();      
        category.name = req.body.name;
        category.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: req.body });
        });
    });

categoryRouter.route('/:category_id')
    .get((req, res) => {
      Category.findById(req.params.category_id, function(err, category) {
        if (err)
            res.send(err);
        res.json(category);
      });
    })
    .put((req, res) => {
        Category.findById(req.params.category_id, function(err, category) {
          if (err)
              res.send(err);

          category.name = req.body.name;  

            category.save(function(err) {
            if (err)
                res.send(err);

             res.json({ message: 'Category updated!' });
            });
        });
      })
      .delete((req, res) => {
        Category.findById(req.params.category_id, function(err, category) {
          if (err)
              res.send(err);
         Category.remove({
                _id: req.params.category_id
            }, function(err, category) {
                if (err)
                    res.send(err);
    
                res.json({ message: req.params.category_id });
            });
        });
      });

module.exports = categoryRouter;