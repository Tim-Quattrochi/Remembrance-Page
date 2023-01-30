const GoogleStrategy = require("passport-google-oauth20").Strategy;
const googleUser = require("../models/googleUserModel");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  GOOGLE_CALLBACK_URL,
} = require("./constants");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET_ID,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          uid: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          picture: profile.photos[0].value,
        };

        try {
          let user = await googleUser.findOne({
            uid: profile.id,
          });

          if (user) {
            done(null, user);
          } else {
            user = await googleUser.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    googleUser.findById(id, (err, user) => done(err, user));
  });
};
