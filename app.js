const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');


mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//listening on any root
app.get("/", (req, res) => {
    res.send("Hello world")
}) 


//could be a different port for heroku lauch
const port =  process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
