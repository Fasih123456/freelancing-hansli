const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../models/Users");
require("dotenv").config();

const GOOGLE_CLIENT_ID = "420671041769-2ok9oi9splbnsd6bes656s6anbpmhcsg.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

router.use(
  session({
    secret: "somerandomlycatingwows",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    //called when user is authenticated
    function (accessToken, refreshToken, profile, cb) {
      let id = profile.id; //Since ID stored in Google and Twitter are greater than 2^32, we only store the first 8 digits
      let newId = id.toString().slice(0, 8);
      let User = new Users(newId, profile.displayName, profile.emails[0].value, 0);
      User.findOrCreate();
      cb(null, profile);
    }
  )
);

router.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get("/auth/google", async (req, res, next) => {
  passport.authenticate("google")(req, res, next);
});

router.get("/api/profile", (req, res) => {
  res.send(req.session.user);
});

router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    // Your callback logic goes here
    res.redirect("http://localhost:3000");
  });
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    // Save user information to session
    req.session.user = req.user;
    res.redirect("http://localhost:3000");
  }
);

module.exports = router;
