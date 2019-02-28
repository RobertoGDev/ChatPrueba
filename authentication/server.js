const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtmiddleware = require('./middlewares/jwt')
const GoogleStrategy = require('./strategies/google');
const UserModel = require('./models/User');

app.use(passport.initialize());
passport.use(GoogleStrategy);

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/google', passport.authenticate('google', {
    scope: ['profile'],
    session: false
}))
app.get('/google/callback', passport.authenticate('google', {
    scope: ['profile']
}), (req, res) => {
    res.status(200).json({
        user: req.user
    });
})

jwt.sign({
    userId: req.user._id
}, process.env.JTWSALT, (err, token) => {
    if (err) {
        throw err;
    };
    return res.redirect(`${process.env.URL_CLIENT}/index.html?token=${token}`);
})

app.get('/userdata', jwtmiddleware, async (req, res) => {
    const user = await UserModel.findOne({_id:req.userId});

    if(!user) {
        return res.status(400).send();
    }

    return res.status(200).json({user});
})

module.exports = app;