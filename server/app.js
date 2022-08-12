require("dotenv").config();
const express = require("express");
const app = express();
// const port = 3000;
const port = 3001;
const mongoose = require("mongoose");
const path = require("path");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

mongoose.connect("mongodb://localhost:27017/keeper");
// mongoose.connect("mongodb+srv://jobin-admin:<password>@cluster0.1ktsf.mongodb.net/keeper?retryWrites=true&w=majority");
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["http://localhost:3000"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
  realname: String,
  username: String,
  password: String,
  googleId: String,
  notes: [{ title: String, content: String }],
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/register", (req, res) => {
  User.register(
    { username: req.body.username, realname: req.body.realname },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.send({ register: "failed", error: err.message });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send({ register: "success" });
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
      console.log("failed login");
      res.send({ login: "failed", error: err.message });
    } else {
      passport.authenticate("local")(req, res, () => {
        res.send({ login: "success" });
      });
    }
  });
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ logout: "success" });
    }
  });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
