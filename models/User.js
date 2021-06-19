const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'Kito' },
    full_name: { type: String, default: null },
    email: { type: String, default: null },
    instagram: { type: String, default: null },
    facebook: { type: String, default: null },
    twitter: { type: String, default: null },
    wattpad: { type: String, default: null },
    sessionToken: { type: String, default: null }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;