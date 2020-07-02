const router = require('express').Router();
const User = require('../model/User');

router.route('/').get((req, res) => {
    res.render('index');
});

router.route('/dashboard').get((req, res) => {
    // Demonstration
    const sessionToken = req.cookies.token;
    User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user) {
                res.redirect('/users/login');
            } else {
                res.render('dashboard', { username: user.username });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;