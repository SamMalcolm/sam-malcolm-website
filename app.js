var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const formidable = require('formidable')

var app = express();
const config = require('config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new MemoryStore({
        checkPeriod: 86400000
    }),
    secret: 'Tj4W;h4KqU4AAGYieKPLH}Jh',
    cookie: { maxAge: 86400000 },
    resave: false,
    saveUninitialized: false
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

console.log("connecting to DB");
mongoose.connect(config.get("mongoDB"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



// app.dynamicHelpers({
//     session: function (req, res) {
//         return req.session;
//     }
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: "Error",
        error: err.message
    });
});

module.exports = app;
