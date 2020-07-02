const router = require('express').Router();
const sha256 = require('sha256');
const User = require('../model/User');

router.get('/login', async(req, res) => {
    res.render('login');
});

router.get('/register', async(req, res) => {
    res.render('register');
});

router.post('/register', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const time = new Date();

    const sessionToken = sha256(username + time.toString())

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
})

module.exports = router;