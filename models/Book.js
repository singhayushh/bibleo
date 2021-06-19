const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    link: { type: String, required: true, unique: false },
    cover: { type: String, default: 'default' },
    favourite: { type: Boolean, default: false },
    have_read: { type: Boolean, default: false },
    reading_now: { type: Boolean, default: false },
    tags: { type: Array },
    user_id: { type: String, required: true }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;