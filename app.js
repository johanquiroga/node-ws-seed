const express = require('express');
const errors = require('boom');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const config = require('./config');

const connect = mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

connect.then(
  () => {
    console.log(`Connected correctly to server: ${config.mongoUrl}`);
  },
  (err) => {
    console.error(err);
    process.exit(1);
  },
);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(errors.notFound(404));
});

// error handler
app.use((err, req, res, next) => {
  let error = err;
  // set locals, only providing error in development
  if (err instanceof errors) {
    /* eslint-disable no-param-reassign */
    const tmp = new Error();
    tmp.message = err.message || err.output.payload.message;
    tmp.status = err.output.payload.statusCode;
    tmp.data = err.output.payload;
    error = tmp;
    /* eslint-enable no-param-reassign */
  }

  res.locals.message = err.message || 'Something went wrong';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(error.status || error.statusCode || 500);
  res.json({ success: false, error });
});

module.exports = app;
