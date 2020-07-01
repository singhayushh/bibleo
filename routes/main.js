const router = require('express').Router();

router.route('/').get((req, res) => {
    res.render('index');
})

router.route('/dashboard').get((req, res) => {
    // Demonstration
    const username = req.cookies.username;
    res.render('dashboard', { username: username });
})


module.exports = router;