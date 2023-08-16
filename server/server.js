const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
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
  SSL_PATH,
  CRT_PATH,
} = require("./config/constants");

require("./config/passport")(passport);

connectMyDB();

const app = express();

const corsOptions = {
  origin: [
    "https://jerrykrikava.com",
    "http://localhost:3000",
    "http://localhost:3000/",
    "http://localhost:5173/",
    "http://localhost:5173",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;

  next();
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: DB_URI }),
    unset: "destroy",
    cookie: {
      secure: NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(`${API}/`, require("./routes/userRoutes"));
app.use(`${API}/posts`, require("./routes/postRoutes"));

const server =
  NODE_ENV === "production"
    ? https.createServer(
        {
          key: fs.readFileSync(`${SSL_PATH}`),
          cert: fs.readFileSync(`${CRT_PATH}`),
        },
        app
      )
    : http.createServer(app);

app.use(errorHandler);
//404
app.use((req, res, next) => {
  res.status(404).send("Sorry, that page can't be found.");
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
