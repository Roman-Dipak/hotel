const express = require('express')
const app = express();
const db = require('./db'); // import db from the db.js file
const passport = require('./Auth');

//include body parser npm 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//middleware function 
const logrequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] request made to : ${req.originalUrl}`);
  next();
}


app.use(passport.initialize());

app.use(logrequest);

const localAutheticate =  passport.authenticate('local',{session: false});

app.get('/', function (req, res) {
  res.send("welcome to my hotel.");
})

//import personroutes 
const personroutes = require("./routes/personroutes");
app.use("/person", localAutheticate, personroutes);


// import menuroutes file 
const menuroutes = require("./routes/menuroutes");
app.use("/menu", menuroutes);


app.listen(3000, () => {
  console.log("the port is open");
})
