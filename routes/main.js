const router = require('express').Router();
const User = require('../model/User');
const Book = require('../model/Book');

router.route('/').get((req, res) => {
    res.render('index');
});

router.get('/dashboard', async(req, res) => {
    // Demonstration
    const sessionToken = await req.cookies.token;
    await User.findOne({ sessionToken: sessionToken })
        .then(async user => {
            if (!user || !sessionToken) {
                res.redirect('/users/login');
            } else {
                await Book.aggregate([{
                        $match: {
                            have_read: false
                        }
                    }],
                    function(err, data) {
                        if (err) res.status(400).json('Error: ' + err);
                        else {
                            res.render('dashboard', { username: user.username, avatar: user.avatar, books: data });
                        }
                    }
                );
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get('/my-account', async(req, res) => {
    const sessionToken = await req.cookies.token;

    await User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user || !sessionToken) {
                res.redirect('/users/login');
            } else {
                let first_name = '',
                    last_name = '';
                if (user.full_name !== '' && user.full_name !== null) {
                    const _name = user.full_name.split(" ");
                    console.log(_name);
                    if (_name.length > 1) {
                        first_name = _name[0];
                        last_name = _name[1];
                    }
                }
                res.render('settings', { username: user.username, avatar: user.avatar, first_name: first_name, last_name: last_name, email: user.email, instagram: user.instagram, facebook: user.facebook, twitter: user.twitter, wattpad: user.wattpad });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post('/upload', async(req, res) => {
    const sessionToken = await req.cookies.token;
    await User.findOne({ sessionToken: sessionToken })
        .then(async user => {
            if (!user || !sessionToken) {
                res.redirect('/users/login');
            } else {
                user.full_name = req.body.firstname + " " + req.body.lastname;
                user.email = req.body.email;
                user.instagram = req.body.instagram;
                user.facebook = req.body.facebook;
                user.twitter = req.body.twitter;
                user.wattpad = req.body.wattpad;

                await user.save()
                    .then(() => {
                        const url = '/profile/' + user.username;
                        res.redirect(url);
                    })
                    .catch(err => {
                        res.status(400).json(err)
                    });

            }
        })
});

router.get('/profile/:username', async(req, res) => {
    User.findOne({ username: req.params.username })
        .then(user => {
            let first_name = '',
                last_name = '',
                full_name = '';
            if (user.full_name) {
                full_name = user.full_name.split();
                if (full_name.length > 1) {
                    first_name = full_name[0];
                    last_name = full_name[1];
                }
            }
            res.render('profile', { username: user.username, avatar: user.avatar, full_name: user.full_name, first_name: first_name, last_name: last_name, email: user.email, instagram: user.instagram, facebook: user.facebook, twitter: user.twitter, wattpad: user.wattpad });
        })
        .catch(err => {
            res.status(400).json(err);
        })
});

router.get('/logout', async(req, res) => {
    const sessionToken = await req.cookies.token;
    await User.findOne({ sessionToken: sessionToken })
        .then(async user => {
            if (!user || !sessionToken) {
                res.redirect('/users/login');
            } else {
                user.sessionToken = 'null';
                user.save()
                    .then(() => {
                        res.redirect('/users/login');
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    });
            }
        });
});

router.post('/add-book', async(req, res) => {
    const sessionToken = await req.cookies.token;
    await User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user || !sessionToken) {
                res.redirect('/users/login');
            } else {
                let cover = 'default';
                if (req.body.book_cover)
                    cover = req.body.book_cover;
                const newBook = new Book({ name: req.body.book_name, author: req.body.author, link: req.body.book_link, cover: cover, user_id: user._id });

                newBook.save()
                    .then(() => {
                        res.redirect('/dashboard');
                    })
                    .catch(err => {
                        res.status(400).json(err);
                    });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;