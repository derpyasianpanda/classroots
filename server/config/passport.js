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
            
            const passportsRef = db.collection('passports');
            const snapshot = await passportsRef.where('googleID', '==', profile.id).get();
            if (snapshot.empty) {
                
                // Add user
                await passportsRef.doc(profile.id).set({
                    'googleID': profile.id,
                    'displayName': profile.displayName,
                    'firstName': profile.firstName,
                    'lastname': profile.lastName,
                    'image' : profile.photos[0].value
                })
            }

            // return that user from the database in the callback
            return callback(null, newUser);
        }
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, callback) => {
  
        let id = null;

        const passportsRef = db.collection('passports');
        const snapshot = await passportsRef.where('googleID', '==', profile.id).get();
        if (!snapshot.empty) {
            id = snapshot.data.googleID;
        }

        return callback(null, id);
    });
};