const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require("https");
const http = require("http");
const fs = require("fs");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { errorHandler } = require("./middleware/errorMiddle");
const connectMyDB = require("./config/db");
const {
  PORT,
  NODE_ENV,
  DB_URI,
  API,
  SESSION_SECRET,
} = require("./config/constants");

require("./config/passport")(passport);

connectMyDB();

const app = express();

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: DB_URI }),
    unset: "destroy",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

const corsOptions = {
  origin: "https://jerrykrikava.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(`${API}/`, require("./routes/userRoutes"));
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
