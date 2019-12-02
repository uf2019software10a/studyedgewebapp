const LocalStrategy = require("passport-local").Strategy;

//create schema

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(password, done) {
      if (password == "password") {
        console.log("Password correct");
        return done(null, "test");
      } else {
        console.log("Password incorrect");
        return done(null, false, { message: "Password incorrect" });
      }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, "test user");
  });

  passport.deserializeUser(function(user, done) {
    done("test user");
  });
};
