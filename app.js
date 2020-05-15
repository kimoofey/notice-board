const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./backend/bin/config');

const emailController = require('./backend/controllers/email/emailController');

const indexRouter = require('./backend/routes');
const usersRouter = require('./backend/routes/users');
const categoriesRouter = require('./backend/routes/categories');

const app = express();

//Allow requests only from our app
// app.use(cors({
//   origin: CLIENT_ORIGIN
// }));

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);

// This is the endpoint that is hit from the onSubmit handler in Login page
// The callback is shelled off to a controller file to keep this file light.
app.post('/email', emailController.collectEmail);

// Same as above, but this is the endpoint pinged in the componentDidMount of
// Confirm.js on the client.
app.get('/email/confirm/:id', emailController.confirmEmail);

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
