const User = require('../models/User');
const Book = require('../models/Book');

const RenderIndex = (req, res) => {
    res.render('index');
};

const RenderDashboard = async (req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });        
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const books = await Book.aggregate([
            {
                $match: {
                    have_read: false
                }
            }
        ]);
        res.render('dashboard', { title: "My Library", username: user.username, avatar: user.avatar, books });
    }
};

const RenderFavourites = async (req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const books = await Book.aggregate([{
            $match: {
                favourite: true
            }
        }]);
        res.render('dashboard', { title: "Favourites", username: user.username, avatar: user.avatar, books });
    }
};

const RenderHaveRead = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const books = await Book.aggregate([{
            $match: {
                have_read: true
            }
        }]);
        res.render('dashboard', { title: "Have Read", username: user.username, avatar: user.avatar, books });
    }        
};

const RenderToRead = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const books = await Book.aggregate([{
                $match: {
                    have_read: false
                }
        }]);
        res.render('dashboard', { title: "To Read", username: user.username, avatar: user.avatar, books });
    }        
};

const RenderReadingNow = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const books = await Book.aggregate([{
            $match: {
                reading_now: true
            }
        }]);
        res.render('dashboard', { title: "Reading Now", username: user.username, avatar: user.avatar, books });
    }        
};

const RenderAccount = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken })
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        let first_name = '',
            last_name = '';
        if (user.full_name !== '' && user.full_name !== null) {
            const _name = user.full_name.split(" ");
            if (_name.length > 1) {
                first_name = _name[0];
                last_name = _name[1];
            }
        }
        res.render('settings', { username: user.username, avatar: user.avatar, first_name: first_name, last_name: last_name, email: user.email, instagram: user.instagram, facebook: user.facebook, twitter: user.twitter, wattpad: user.wattpad });
    }       
};

const Upload = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        user.full_name = req.body.firstname + " " + req.body.lastname;
        user.email = req.body.email;
        user.instagram = req.body.instagram;
        user.facebook = req.body.facebook;
        user.twitter = req.body.twitter;
        user.wattpad = req.body.wattpad;

        await user.save();
        const url = '/profile/' + user.username;
        res.redirect(url);
    }
};

const RenderProfile = async(req, res) => {
    const user = await User.findOne({ username: req.params.username })
    let first_name = '', last_name = '', full_name = '';
    if (user.full_name) {
        full_name = user.full_name.split(" ");    // Fix split by space
        if (full_name.length > 1) {
            first_name = full_name[0];
            last_name = full_name[1];
        }
    }
    res.render('profile', {  title: "My Profile", username: user.username, avatar: user.avatar, full_name: user.full_name, first_name: first_name, last_name: last_name, email: user.email, instagram: user.instagram, facebook: user.facebook, twitter: user.twitter, wattpad: user.wattpad });
};

const RenderEditAvatar = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken })
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        res.render('avatar', { username: user.username, avatar: user.avatar });
    }
};

const EditAvatar = async (req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        if (req.body.avatar) user.avatar = req.body.avatar;
        await user.save();
        res.redirect('/dashboard');
    }
};

const Logout = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        user.sessionToken = 'null';
        user.save();
        res.redirect('/users/login');
    }
};

const AddBook = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        let cover = 'default';
        if (req.body.book_cover) cover = req.body.book_cover;
        const newBook = new Book({ name: req.body.book_name, author: req.body.author, link: req.body.book_link, cover: cover, user_id: user._id });
        await newBook.save();
        res.redirect('/dashboard');
    }
};

const DeleteBook = async (req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const book_id = req.body.book_id;
        await Book.deleteOne({ _id: book_id, user_id: user._id });
        res.redirect('/dashboard');
    }
};

const RenderEditBook = async(req, res) => {
    const book_id = req.query.book_id;
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const book = await Book.findOne({_id: book_id, user_id: user._id})
        res.render('edit-book', {
            book_id: book._id,
            book_name: book.name,
            author: book.author,
            book_link: book.link,
            book_cover: book.cover,
            book_favourite: book.favourite,
            book_have_read: book.have_read,
            book_reading_now: book.reading_now,
            book_tags: book.tags,
            username: user.username,
            avatar: user.avatar
        });
    }
};

const EditBook = async (req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.redirect('/users/login');
    } else {
        const book_id = req.body.book_id;
        let book = await Book.findOne({ _id: book_id, user_id: user._id });
        book.name = req.body.book_name;
        book.author = req.body.author;
        book.link = req.body.book_link;
        book.cover = req.body.book_cover;
        book.favourite = req.body.book_favourite;
        book.have_read = req.body.book_have_read;
        book.reading_now = req.body.book_reading_now;
        const tags = req.body.book_tags.trim().split(",");
        book.tags = tags;
        await book.save();
        res.redirect('/dashboard');
    }
};

module.exports = {
    RenderIndex,
    RenderDashboard,
    RenderHaveRead,
    RenderToRead,
    RenderFavourites,
    RenderReadingNow,
    RenderAccount,
    RenderEditAvatar,
    RenderEditBook,
    RenderProfile,
    RenderReadingNow,
    Logout,
    AddBook,
    DeleteBook,
    EditBook,
    Upload,
    EditAvatar
};