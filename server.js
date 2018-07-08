var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');


  console.log('Hiiiii');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/expenseManager'); 
mongoose.connect('mongodb://admin:spartans300@ds219641.mlab.com:19641/room-share');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var entry = function (req, res, next) {
  next();  
}

var categoryRouter = require('./api/routes/categoryRoutes');
var userRouter = require('./api/routes/userRoutes');
var expenseRouter = require('./api/routes/expenseRoutes');
var reportRouter = require('./api/routes/reportRoutes');

app.use(entry);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/reports', reportRouter);



app.listen(port);
