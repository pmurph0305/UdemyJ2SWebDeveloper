const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const auth = require("./controllers/authorization");
const image = require("./controllers/image");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signin = require("./controllers/signin");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI
  // connection: {
  //   host : process.env.POSTGRES_HOST,
  //   user : process.env.POSTGRES_USER,
  //   password : process.env.POSTGRES_PASSWORD,
  //   database : process.env.POSTGRES_DB
  // }
});

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("ITS WORKING");
});
app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.post("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, db);
});
app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
