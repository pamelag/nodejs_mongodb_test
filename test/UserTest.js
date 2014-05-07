var User = require('../server_modules/User');
var  should = require('should');
var assert = require('assert');
var mongo = require('mongoskin');

describe("User", function(){

    var db = mongo.db("mongodb://localhost:27017/UserData", {native_parser:true});
    var user = new User(db);
    var new_user = {
        firstName: 'Pamela',
        lastName: 'Gangopadhyay',
        email: 'pg6@email.com',
        password: 'changeMe'
    }

    var user_authenticate = {email: 'pg67@email.com', password: 'changeMe'};

    it("register new user with unique email", function(done){

        user.register(new_user, function(err, fetched_email){
            fetched_email.should.equal('pg6@email.com');
            done();
        });
    });

    it("login with proper email and password", function(done){

        user.authenticate(user_authenticate, function(err, user_id){
            var existing_user_id = user_id;
            user_id.should.not.be.null;
            done();
        });
    });


});
