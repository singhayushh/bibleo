const router = require('express').Router();
const u = require('../controllers/user');

router.get('/login', u.RenderLogin);

router.get('/register', u.RenderRegister);

router.post('/register', u.Register);

router.post('/login', u.Login);

router.get('/logout', u.Logout);

module.exports = router;