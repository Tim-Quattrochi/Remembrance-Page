const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const MongoStore = require("connect-mongo");
const findOrCreate = require("mongoose-findorcreate");
const { PORT, API, NODE_ENV, DB_URI } = require("./config/constants");
const { errorHandler } = require("./middleware/errorMiddle");
const googleUser = require("./models/googleUserModel");
const connectMyDB = require("./config/db");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  GOOGLE_CALLBACK_URL,
} = require("./config/constants");

require("./config/passport")(passport);

connectMyDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: DB_URI }),
  })
);

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_ID,
      callbackURL: GOOGLE_CALLBACK_URL,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      googleUser.findOne(
        {
          googleId: profile.id,
        },
        function (err, user) {
          if (err) {
            return done(err);
          }

          if (!user) {
            user = new googleUser({
              name: profile.displayName,
              googleId: profile.id,
              email: profile.email,
            });
            user.save(function (err) {
              if (err) console.log(err);
              return done(err, user);
            });
          } else {
            //found user. Return
            return done(err, user);
          }
        }
      );
    }
  )
);

app.use(`/`, require("./routes/userRoutes"));
app.use(`${API}/posts`, require("./routes/postRoutes"));

const server =
  NODE_ENV === "production"
    ? https.createServer(
        {
          key: fs.readFileSync("/etc/nginx/ssl/jerrykrikava.com.key"),
          cert: fs.readFileSync(
            "/etc/nginx/ssl/nginx_bundle_b914d6944308.crt"
          ),
        },
        app
      )
    : http.createServer(app);

//404
app.use((req, res, next) => {
  res.status(404).send("Sorry, that page can't be found.");
});

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
