var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const exhbs = require('express-handlebars')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



async function start(){
  try{
    await mongoose.connect('mongodb+srv://mirzaabdullayev:GyeI0l6BlW34k7aR@adminpanel.3hbpu.mongodb.net/adminPanel')

    const db = mongoose.connection

  db.on('error', console.error.bind(console, 'Console error'))
  db.once('open', function (){
    console.log("mongoDB succes conection");
  })
  }
  catch(error){
  console.log(error);
 }

}
start()

app.engine('hbs', exhbs({
  layoutsDir: path.join(__dirname, 'views'),
  defaultLayout: 'layout',
  extname: 'hbs',
  partialsDir:[
    path.join(__dirname, 'views/partials')
  ],
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  }

}))



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
