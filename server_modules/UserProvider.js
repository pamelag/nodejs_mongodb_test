var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

UserProvider = function(host, port) {
    this.db= new Db('users', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    this.db.open(function(){});
};

UserProvider.prototype.getCollection= function(callback) {
    this.db.collection('users', function(error, user_collection) {
        if( error ) callback(error);
        else callback(null, user_collection);
    });
};

UserProvider.prototype.save = function(user, callback) {
    this.getCollection(function(error, user_collection) {
        if( error ) callback(error)

        user_collection.insert(user, function() {
            callback(null, user);
        });

    });
};

UserProvider.prototype.update = function(user, callback) {
    this.getCollection(function(error, user_collection) {
        if( error ) callback(error)

        user_collection.update(
            { name: user.name },
            {
                name: user.name,
                email: user.email,
                password: user.password,
                lastName: user.lastName
            },
            { upsert: true }
        )

    });
};

exports.UserProvider = UserProvider;