const mongoose = require('mongoose');
const Schema = mongoose.Schema
const AccountSchema = new Schema({
    name: String,
    number: Number,
    email: String,
    password: String
}, {
    timestamps: true, versionKey: false
})
module.exports = mongoose.model('user', AccountSchema)