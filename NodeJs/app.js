const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.port || 3000;

//cross origin browser for port
const cors = require("cors");
//user route
const user = require("./router/user");

const db = mongoose.connect(
  "mongodb://localhost:27017/Authentication",
  {
    useNewUrlParser: true
  },
  err => {
    if (!err) {
      console.log("Connected to DB");
    }
  }
);

app.use(bodyParser.json());
app.use(cors());
app.use(user.router);

app.listen(port, () => {
  console.log("Gulp is running PORT : " + port);
});
