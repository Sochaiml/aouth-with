const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
//for generating random password
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new google auth strategy
passport.use(new googleStrategy({
    //details obtained from google cloud console
    clientID: "1025344814535-fe0p6eburu0om9b22qjd79r0slais33c.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:10000/auth/google/callback",  
 }, function(accessToken, refreshToken, profile, done){
    //find the email in Database
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in google strategy passport: ',err);return;};
        console.log(profile);
        //if user is already there, just authenticate and return to homepage
        if(user){
            return done(null,user);
        }
        //create new user and return
        else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(100).toString('hex')
            },function(err,user){
                if(err){console.log('Error in creating user ',err);return;};
                return done(null,user);
            })
        }

    })
 }

 ));

 module.exports = passport;