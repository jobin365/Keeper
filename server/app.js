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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      // callbackURL: "https://sleepy-ridge-02151.herokuapp.com/auth/google/keeper",
      callbackURL: "http://localhost:3001/auth/google/keeper",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          googleId: profile.id,
          username: profile.emails[0].value,
          realname: profile.displayName,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

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

app.get("/checkLoginStatus", (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ status: true, username: req.user.username });
  } else {
    res.send({ status: false });
  }
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

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/keeper",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
    // res.redirect("/");
  }
);

app.get("/getAllNotes", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          res.send(foundUser.notes);
        }
      }
    });
  } else {
    res.send({ message: "Unauthenticated request" });
  }
});

app.post("/addNote", (req, res) => {
  if (req.isAuthenticated()) {
    const newNote = {
      title: req.body.title,
      content: req.body.content,
    };
    User.findById(req.user.id, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.notes.push(newNote);
          foundUser.save().then(() => {
            res.send(foundUser.notes[foundUser.notes.length-1]);
          });
        }
      }
    });
  } else {
    res.send({ message: "Unauthenticated request" });
  }
});

app.patch("/deleteNote", (req, res) => {
  if (req.isAuthenticated()) {
    User.findById(req.user.id, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          const noteId = req.body.id;
          let i = 0;
          foundUser.notes.forEach((element) => {
            if (noteId == element._id) {
              foundUser.notes.splice(i, 1);
              foundUser.save().then(() => {
                res.send({ deleteNote: "success" });
              });
            }
            i++;
          });
        }
      }
    });
  } else {
    res.send({ message: "Unauthenticated request" });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`);
});
