var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var url = require('url');
var router = express.Router();
var mongoose = require('mongoose');


/*
 * Routes
 */
var routes = require('./routes/index');
var users = require('./routes/users');
var rCourses = require('./routes/courses');

/*
 *mongoose connection
 */
var dbURI = "mongodb://nightschoolmaster:nightschool2mediaprima@kahana.mongohq.com:10095/nightschool";

mongoose.connect(process.env.MONGOHQ_URL || dbURI);
//successful mongoose connection
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to' + dbURI)
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});
//Close mongoose connection if node process ends
process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    })
});

var app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/

app.use(favicon());
//development only logger
if ('test' != app.get('env')){
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

/**
 * REST API
 */
app.use('/', router);

router.post('/courses/find', rCourses.find);
router.get('*', function(req, res){
    res.sendfile('./public/index.html');
});
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
