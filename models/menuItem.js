const { uniq } = require('lodash');
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        required: true,
        enum: ["sweet", "spicy", "sour"]
    },
    is_Drink:  {
        type: Boolean,
        default: false 
    }
})

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;