const router = require('express').Router();
const User = require('../model/User');

router.route('/').get((req, res) => {
    res.render('index');
});

router.get('/my-account', async(req, res) => {
    const sessionToken = await req.cookies.token;
    console.log(sessionToken)
    await User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user) {
                res.redirect('/users/login');
            } else {
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
                res.render('settings', { username: user.username, avatar: user.avatar, first_name: first_name, last_name: last_name, email: user.email, instagram: user.instagram, facebook: user.facebook, twitter: user.twitter, wordpatt: user.wordpatt });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get('/dashboard', async(req, res) => {
    // Demonstration
    const sessionToken = await req.cookies.token;
    console.log(sessionToken);
    await User.findOne({ sessionToken: sessionToken })
        .then(user => {
            if (!user) {
                res.redirect('/users/login');
            } else {
                res.render('dashboard', { username: user.username, avatar: 'Emily' });
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = router;