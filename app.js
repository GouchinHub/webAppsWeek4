var express = require('express');
const mongoose = require('mongoose')
const ejs = require('ejs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipeRouter = require('./routes/recipe');
var categoryRouter = require('./routes/category');
var imagesRouter = require('./routes/images');

const mongoDb = (process.env.MONGO_URL || "mongodb://127.0.0.1:27017/recipedb")
mongoose.connect(mongoDb);
mongoose.Promise = Promise;
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongoDb connection failed"));

var app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipe/', recipeRouter);
app.use('/category/', categoryRouter);
app.use('/images/', imagesRouter);

console.log("listening to port 1234")
module.exports = app;

