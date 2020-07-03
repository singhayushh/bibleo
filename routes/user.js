const router = require('express').Router();
const sha256 = require('sha256');
const User = require('../model/User');

router.get('/login', async(req, res) => {
    const sessionToken = await req.cookies.token;
    await User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user || !sessionToken) {
                res.render('login');
            } else {
                res.redirect('/dashboard');
            }
        });
});

router.get('/register', async(req, res) => {
    const sessionToken = await req.cookies.token;
    await User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user || !sessionToken) {
                res.render('register');
            } else {
                res.redirect('/dashboard');
            }
        });
});

router.post('/register', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const time = new Date();

    const sessionToken = sha256(username + time.toString());

    const newUser = new User({ username: username, password: password, sessionToken: sessionToken });
    newUser.save()
        .then(user => {

            res.cookie('token', sessionToken, {
                maxAge: 60000, // Lifetime is 1 day for now i.e. user will have to re login each day
            })
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const time = new Date();
    const sessionToken = sha256(username + time.toString());

    User.findOne({ username: username, password: password })
        .then(user => {
            if (!user || !sessionToken) {
                res.status(206).json('Invalid Login Credentials');
            } else {
                user.sessionToken = sessionToken;
                user.save();
                res.cookie('token', sessionToken, {
                    maxAge: Date.now() + 365 * 24 * 60 * 60 * 1000 // Lifetime is 1 year.
                })
                res.redirect('/dashboard');
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;