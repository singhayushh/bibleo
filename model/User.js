const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'Sauron' },
    sessionToken: { type: String, default: null }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;