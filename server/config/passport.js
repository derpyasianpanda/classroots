const GoogleStrategy = require("passport-google-oauth20").Strategy;
const db = require("./firebase.js");

// Configures a given passport to use the Google Strategy
module.exports = passport => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/users/login/callback"
        },
        async (accessToken, refreshToken, profile, callback) => {
            const userInfo = {
                googleID: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value
            };

            const usersRef = db.collection("users");
            let snapshot = await usersRef.where("googleID", "==", userInfo.googleID).get();
            if (snapshot.empty) {
                await usersRef.doc(profile.id).set(userInfo);
                snapshot = await usersRef.where("googleID", "==", userInfo.googleID).get();
            }
            let user;
            snapshot.forEach(snap => {
                user = snap.data();
            });
            return callback(null, user);
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.googleID);
    });

    passport.deserializeUser(async (id, callback) => {
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("googleID", "==", id).get();
        let user;
        snapshot.forEach(snap => {
            user = snap.data();
        });
        return callback(null, user);
    });
};