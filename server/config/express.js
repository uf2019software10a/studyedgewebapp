const path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  examRouter = require("../routes/exam.server.routes");
userRouter = require("../routes/user.server.routes");
reservationRouter = require("../routes/reservation.server.routes");
adminRouter = require("../routes/reservation.server.routes");
adminLoginRouter = require("../routes/adminlogin.server.routes");
session = require("express-session");
passport = require("passport");
require("./passport")(passport);

module.exports.init = () => {
  mongoose.connect(process.env.DB_URI || require("./config").db.uri, {
    useNewUrlParser: true
  });
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
  mongoose.set("useUnifiedTopology", true);

  // initialize app
  const app = express();

  // enable request logging for development debugging
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());

  // add a router
  app.use("/api/exams", examRouter);
  app.use("/api/users", userRouter);
  app.use("/api/reservations", reservationRouter);
  app.use("/Admin/login", adminLoginRouter);
  //app.use("/api/Admin", adminLoginRouter);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  app.use(
    session({
      secret: "ewfwefwsadc",
      resave: false,
      saveUninitialized: false
      //cookie: { secure: true }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  return app;
};
