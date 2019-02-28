let GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.URL_AUTH}${process.env.GOOGLE_CALLBACK_URL}`
  },
  async function(accessToken, refreshToken, profile, cb) {
    const prevUser = await User.find({ googleId: profile.id }.exec().catch(err => done(err, null)));

    if(prevUser){
        return done(null, prevUser);
    }

    const user = new UserModel({
        username: profile.username,
        picture: profile.picture,
        socialId: profile.id
    });

    const newUser = await user.save().catch(err => done(err, null));

    if (newUser) {
        return cb(null, newUser);
    }
  }
));