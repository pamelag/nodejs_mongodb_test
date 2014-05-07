/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    ,   _ = require('underscore')
    , cons = require('consolidate')
    , User = require('./server_modules/User')
    , mongo = require('mongoskin');

var app = exports.app = express();
var db = mongo.db("mongodb://localhost:27017/UserData", {native_parser:true});
var userData = new User(db);

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

app.post('/register', function(req, res){

    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    userData.register(user, function( err, email) {
    if(err) {
        res.json({status:'failed', return_value: err});
    } else {
        var response_text = 'An email will be sent to '+email;
        res.json({status: 'successful', return_value: response_text});
    }

    });
});

app.post('/login', function(req, res){

    userData.authenticate({
        email: req.body.email,
        password: req.body.password
    }, function( err, returned_id) {
        if(err) {
            res.json({status:'error', return_value: err});
        } else {
            res.json({status: 'successful', return_value: returned_id});
        }
    });
});

app.put('/user/update', function(req, res){
    userData.update({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }, function( err, status) {
        if(err) {
            res.json({status:'error', return_value: err});
        } else {
            res.json({status: 'successful', return_value: status});

        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
