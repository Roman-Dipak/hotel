const mongoose = require('mongoose');

const mongodbURL = 'mongodb://localhost:27017/hotels'
 
mongoose.connect(mongodbURL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true

})

//define the database connection
const db = mongoose.connection;

// handling the database eventlistner
db.on("connected", () => {
    console.log("database is connected");
})

db.on("disconnected" , () => {
    console.log("database is disconnected");
})

db.on("error", () => {
    console.log("databse connection error");
})

// exports the database
module.exports = db;