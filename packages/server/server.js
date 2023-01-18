const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/constants");
const connectMyDB = require("./config/db");

connectMyDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
