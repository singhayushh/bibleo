const router = require('express').Router();
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

    const newUser = new User({ username: username, password: password });
    newUser.save()
        .then(user => {
            // This cookie has been set with username for demonstration purpose. Will be changed soon.
            res.cookie('username', username, {
                maxAge: 60000, // Lifetime
            })
            res.redirect('/dashboard');
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

module.exports = router;