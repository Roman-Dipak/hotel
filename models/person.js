const { uniq, uniqueId } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    work: {
        type: String,
        enum: ["chef", "manager", 'waiter', "owner"],
        required: true

    },
    mobile: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        required: true,
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String 
    },
    password: {
        required: true,
        type: String
    }
})

personSchema.pre('save', async function(next){
    const person = this;

    //if in some situation like( update )  password was already created so their is no need to create hash password
    if(!person.isModified('password')) return next();

    try{
        // genrate salt 
        const salt = await bcrypt.genSalt(10);

        //create a hash password 
        const hashPassword  = await bcrypt.hash(this.password, salt);

        //conbine hash password with original password 
        person.password = hashPassword;

        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const person = mongoose.model('person', personSchema);
module.exports = person;