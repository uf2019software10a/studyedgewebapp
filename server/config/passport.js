const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      if (password == "password") {
        console.log("Password is correct!");
        const user = {
          _id: "adminid",
          username: username,
          password: password
        };
        return done(null, user);
      } else {
        console.log("Password is incorrect!");
        return done(null, false, { message: "Password incorrect" });
      }
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    const user = {
      _id: "adminid",
      username: "admin",
      password: "password"
    };
    done(null, user);
  });
};
