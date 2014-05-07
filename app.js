/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    ,   _ = require('underscore')
    , cons = require('consolidate')
    , userProvider = require('UserProvider');

var app = express();


app.set('port', process.env.PORT || 7000);
app.set('views', __dirname + '/views');
app.set('view options', {layout: false});
app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.post('/user/register', function(req, res){
    userProvider.save({
        name: req.param('name'),
        lastName: req.param('lastname'),
        email: req.param('email'),
        password: req.param('password')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.post('/user/login', function(req, res){
    userProvider.save({
        email: req.param('email'),
        password: req.param('password')
    }, function( error, docs) {
        res.redirect('/')
    });
});


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
