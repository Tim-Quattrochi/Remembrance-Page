const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/constants");
const { errorHandler } = require("./middleware/errorMiddle");
const connectMyDB = require("./config/db");

connectMyDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
