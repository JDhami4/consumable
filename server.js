const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const profile = require("./routes/api/profile");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//DB Config

const db = require("./config/keys").mongoURI;

//Connect to MongoDBclear
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));

//Use Routes
app.use("/api/profile", profile);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
