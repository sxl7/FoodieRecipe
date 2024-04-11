//set up schma model a Schema
const mongoose = require("mongoose")

const UserSchma = new mongoose.Schema({
    uid: String,
    password: String,
    email: String,
})

const UserModel = mongoose.model("usersinfos", UserSchma)

module.exports = UserModel