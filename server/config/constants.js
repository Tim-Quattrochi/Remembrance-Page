const DB_URI = process.env.DB_URI;
const API = process.env.API;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;
const CRT_PATH = process.env.CRT_PATH;
const SSL_PATH = process.env.SSL_PATH;

module.exports = {
  DB_URI,
  API,
  JWT_SECRET,
  PORT,
  NODE_ENV,
  GOOGLE_CLIENT_ID,
  GOOGLE_CALLBACK_URL,
  GOOGLE_SECRET_ID,
  SESSION_SECRET,
  CLIENT_HOME_PAGE_URL,
};
