const passport = require('koa-passport');
const LocalStretegy = require('passport-local').Strategy;

const User =  require('./../model/user');

passport.serializeUser( (user, done) => {
  done(null, user)
});

passport.deserializeUser( (user, done) => {
  done(null, user)
});

passport.use(new LocalStretegy( (email, password, done) => {
    User.findOne({ email: email }, function(err, user) {
        if (err) return done(null,flase);
        if(!user) return done(null,false);

        user.comparePassword(password, function(err, isMatch) {
            if (isMatch === true) return done(null,user);
            else return done();
        });
    });

}));

module.exports = passport