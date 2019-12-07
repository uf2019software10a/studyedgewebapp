const LocalStrategy = require("passport-local").Strategy;

//The reason there are so many dumby variables inserted is because passport.js is set up to be used with a user database, so it is formatted to take in multiple users
//Since there is only one user being authenticated, I had to insert dumby variables in places where passport usually uses a database to look up users

module.exports = function(passport) {
  passport.use(
    //username is a dumby variable because passport.js is formatted to have both a username and password
    new LocalStrategy(function(username, password, done) {
      //checking if inputted password is equal to the literal word "password"
      if (password == "password") {
        console.log("Password is correct!");
        //making a user with a dumby _id and username
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

  //serializing user with dumby _id variable
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  //deserializing user with dumby user parameters
  passport.deserializeUser(function(id, done) {
    const user = {
      _id: "adminid",
      username: "admin",
      password: "password"
    };
    done(null, user);
  });
};
