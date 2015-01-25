var model = require('./model');

exports.strategy = function(username, password, done) {
    model.User.findOne({ username: username }, function (err, user) {

        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (user.password != password) { return done(null, false); }
        return done(null, user);
    });
};

exports.serializeUser = function (user, done) {
    done(null, user._id);
};

exports.deserializeUser = function (_id, done) {
    model.User.findOne({_id: _id}, function (err, user) {
        done(err, user);
    });
};