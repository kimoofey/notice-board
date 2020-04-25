var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./backend/routes');
var usersRouter = require('./backend/routes/users');
var categoriesRouter = require('./backend/routes/categories');

var app = express();

app.use(express.static(path.join(__dirname, 'backend/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'backend/build', 'index.html'));
});

// view engine setup
app.set('views', path.join(__dirname, 'backend/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'backend/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
