/* ----------------------- Imports ---------------------- */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
var cookieParser = require('cookie-parser');
require('dotenv').config(); // Aryan ask for the .env file if you have read this.


/* ----------------- Basic Server Config ---------------- */

const app = express();
const port = process.env.port || 3000;
const startTime = new Date();


/* ------------ Client Side Interaction Setup ----------- */

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');


/* -------------------- MongoDB Setup ------------------- */

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then()
    .catch(err => console.log('Error:' + err));
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connected...');
})


/* ----------------------- Routes ----------------------- */

const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');

app.use('/users', userRouter);
app.use('/', mainRouter);


/* ------------------ Test Route Setup ------------------ */

app.route('/api').get((req, res) => {
    res.json("Server started successfully on " + startTime);
});

/* --------------------- Run Server --------------------- */

app.listen(port, () => {
    console.log(`Server is running on 127.0.0.1:${port}`);
});