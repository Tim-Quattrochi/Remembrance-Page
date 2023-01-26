const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require('https')
const http = require('http')
const fs = require('fs')
const { PORT, API, NODE_ENV } = require("./config/constants");
const { errorHandler } = require("./middleware/errorMiddle");
const connectMyDB = require("./config/db");

connectMyDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${API}/users`, require("./routes/userRoutes"));
app.use(`${API}/posts`, require("./routes/postRoutes"));

const server = 
  NODE_ENV === "production"
    ? https.createServer({
      key: fs.readFileSync(path.join(__dirname,'/etc/nginx/ssl/jerrykrikava.com.key')),
      cert: fs.readFileSync(path.join(__dirname,'/etc/nginx/ssl/nginx_bundle_b914d6944308.crt')),

    }, app)

    : http.createServer(app)

//404
app.use((req, res, next) => {
  res.status(404).send("Sorry, that page can't be found.");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

server.listen(443, () => {
  console.log('listening for requests on port 443.')
})
