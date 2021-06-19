const User = require('../models/User');
const sha256 = require('sha256');

const RenderLogin = async (req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken });
    if (!user || !sessionToken) {
        res.render('login');
    } else {
        res.redirect('/dashboard');
    }
};

const RenderRegister = async(req, res) => {
    const sessionToken = await req.cookies.token;
    const user = await User.findOne({ sessionToken: sessionToken })
    if (!user || !sessionToken) {
        res.render('register');
    } else {
        res.redirect('/dashboard');
    }
};

const Register = async(req, res) => {
    const username = req.body.username;
    const password = sha256(req.body.password);
    const time = new Date();
    const sessionToken = sha256(username + time.toString());
    const newUser = new User({ username: username, password: password, sessionToken: sessionToken });
    await newUser.save();
    res.cookie('token', sessionToken, {
        maxAge: 30*24*60*60*60,
    })
    res.redirect('/dashboard');
};

const Login = async(req, res) => {
    const username = req.body.username;
    const password = sha256(req.body.password);
    const time = new Date();
    const sessionToken = sha256(username + time.toString());

    let user = await User.findOne({ username: username, password: password })
    if (!user || !sessionToken) {
        res.status(206).json('Invalid Login Credentials');
    } else {
        user.sessionToken = sessionToken;
        await user.save();
        res.cookie('token', sessionToken, {
            maxAge: Date.now() + 365 * 24 * 60 * 60 * 1000 // Lifetime is 1 year.
        })
        res.redirect('/dashboard');
    }
};

const Logout = async(req,res)=>{
    const sessionToken = req.cookies.token;
    await User.updateOne({ sessionToken: sessionToken }, { sessionToken: null });
    return res.redirect('/');
};

module.exports = {
    RenderLogin,
    RenderRegister,
    Register,
    Login,
    Logout
}