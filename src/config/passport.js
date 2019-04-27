const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserDetail = require('../app/models/userDetails');
const config = require('./database');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload,done) => {
        console.log(jwt_payload);
        UserDetail.getUserById(jwt_payload._id,(err,user) => {
            if(err) {
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    }));
}