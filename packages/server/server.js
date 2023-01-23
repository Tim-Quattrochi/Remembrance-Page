const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { PORT, API } = require("./config/constants");
const { errorHandler } = require("./middleware/errorMiddle");
const connectMyDB = require("./config/db");

connectMyDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${API}/users`, require("./routes/userRoutes"));
app.use(`${API}/posts`, require("./routes/postRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.all("*", (req, res, next) => {
    res.sendFile(
      path.resolve(__dirname, "../client/build/index.html")
    );
  });
}

//404
app.use((req, res, next) => {
  res.status(404).send("Sorry, that page can't be found.");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
