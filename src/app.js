const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // 'secure: true' nếu dùng HTTPS
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/admin", express.static("admin"));

require("./dbs/mongodb");

app.use("/", require("./routers"));

module.exports = app;
