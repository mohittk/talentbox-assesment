const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const User = new Schema({
    id : Number,
    name : String


})

module.exports = mongoose.model('Friends', User)