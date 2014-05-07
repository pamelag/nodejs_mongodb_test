User = function(db) {
    this.db = db;
};
User.prototype.register = function(pUser, callback) {
    var self = this;
    var user = {
        firstName: pUser.firstName,
        lastName: pUser.lastName,
        email: pUser.email,
        password: pUser.password
    };

    self.db.collection('users_collection').insert(user, function (err) {
        if(err) {
            callback(err, null);
        } else {

            self.db.collection('users_collection').find({email: pUser.email}).toArray(function (err, user) {
                var user_json = JSON.parse(JSON.stringify(user));

                callback(null, user_json[0].email);
            })
        }
    });
};

User.prototype.authenticate = function(pUser, callback) {
    var self = this;

    self.db.collection('users_collection').findOne({email: pUser.email, password: pUser.password}, function(err, user){
        var user_json = JSON.parse(JSON.stringify(user));
        if(err) {
            callback(err, null);
        } else {
            if(user_json._id && user_json._id != null) {
                callback(null, user_json._id);
            } else {
                callback(null, null);
            }
        }

    });
};

User.prototype.update = function(pUser, callback) {
    var self = this;

    self.db.collection('users_collection').update(pUser.id, { $set: {firstName:pUser.firstName, lastName:pUser.lastName, password:pUser.password}},
        function (err, updated_user) {
            if (err) {
                callback(err, null);
            } else {
                if(updated_user) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }

            }

        });
};

module.exports = User;