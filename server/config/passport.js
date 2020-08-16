const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./firebase.js");

// Configures a given passport to use the Google Strategy
module.exports = passport => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/users/login/callback"
        },
        async (accessToken, refreshToken, profile, callback) => {
            // Implement User creation here
            // profile contains all the information
            const newUser = {
                googleID: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            };
            return callback(null, newUser);
        }
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, callback) => {
        // TODO: Find how to query Firebase
        return callback(null, id);
    });
};