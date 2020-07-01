const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true },
    cover: { type: String },
    favourite: { type: Boolean, default: false },
    have_read: { type: Boolean, default: false },
    reading_now: { type: Boolean, default: false },
    tags: { type: Array }
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;