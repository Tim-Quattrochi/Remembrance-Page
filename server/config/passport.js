const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userModel");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  GOOGLE_CALLBACK_URL,
  GOOGLE_TEST_CALLBACK_URL,
  NODE_ENV,
} = require("./constants");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET_ID,
        callbackURL:
          NODE_ENV === "production"
            ? GOOGLE_CALLBACK_URL
            : GOOGLE_TEST_CALLBACK_URL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        if (req.user && req.user.email) {
          try {
            const user = await User.findOneAndUpdate(
              { email: req.user.email },
              {
                googleId: profile.id,
                email: profile.emails[0].value,
              },
              { new: true }
            );
            done(null, user);
          } catch (error) {
            console.log(error);
            done(error, null);
          }
        }

        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          picture: profile.photos[0].value,
          email: profile.emails[0].value,
        };

        try {
          let user = await User.findOne({
            googleId: profile.id,
          });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",

        session: true,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, {
              error: "Incorrect email or password.",
            });
          }
          const doesPassMatch = await user.comparePassword(password);

          if (!doesPassMatch) {
            return done(null, false, {
              error: "Incorrect email or password.",
            });
          }

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "local-register",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
        session: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email: email });

          if (user) {
            return done(null, false, {
              message: "User already exists.",
            });
          }

          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
