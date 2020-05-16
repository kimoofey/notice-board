const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const indexRouter = require('./backend/routes');
const categoriesRouter = require('./backend/routes/categories');
const users = require('./backend/routes/api/users');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'backend/build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'backend/build', 'index.html'));
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'backend/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'backend/public')));
app.use(passport.initialize());
require('./backend/config/passport')(passport);

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/api/users', users);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
