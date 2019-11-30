const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(password, done) {
      if (password == "pw") {
        console.log("Password correct");
        return done(null, "test");
      } else {
        console.log("Password incorrect");
        return done(null, false, { message: "Password incorrect" });
      }
    })
  );

  passport.serializeUser(function(done) {
    done();
  });

  passport.deserializeUser(function(done) {
    done();
  });
};
