const express = require('express')
const app = express();
const db = require('./db'); // import db from the db.js file

//include body parser npm 
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send("welcome to my hotel.");
})

//import personroutes 
const personroutes = require("./routes/personroutes");
app.use("/person", personroutes);


// import menuroutes file 
const menuroutes = require("./routes/menuroutes");
app.use("/menu", menuroutes);


app.listen(3000, () => {
  console.log("the port is open");
})