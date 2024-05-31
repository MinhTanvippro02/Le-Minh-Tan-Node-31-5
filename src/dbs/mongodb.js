const mongoose = require("mongoose");

class Mongo {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect("mongodb://localhost:27017/db_clothes", {})
      .then(() => {
        console.log("Database connection successfully");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}

module.exports = new Mongo();
