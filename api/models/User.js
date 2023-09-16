const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    userName: { type: String, require: true, min: 4, unique: true },
    userPassword: { type: String, require: true },
});

const UserModel = model('User', UserSchema);
module.exports = UserModel;