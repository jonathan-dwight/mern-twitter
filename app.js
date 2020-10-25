const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require('body-parser');
const User = require("./models/User")


mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
    
//listening on any root
app.get("/", (req, res) => {
    const user = new User({
        handle: "Jd",
        email: "jd@aa.io",
        password: "password"
    })
    user.save()
    res.send("Hello world")
}) 


app.use("/api/users", users);
app.use("/api/tweets", tweets);
//could be a different port for heroku lauch
const port =  process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
