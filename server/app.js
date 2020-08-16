// Dependencies
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const FirestoreStore = require("firestore-store")(session);

const db = require("./config/firebase");
const configurePassport = require("./config/passport");

const PORT = process.env.PORT || 8000;

// Configuration
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(
    session({
        store: new FirestoreStore({
            database: db
        }),
        secret: "test_secret",
        resave: false,
        saveUninitialized: true
    })
);
configurePassport(passport);

// Request Body Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("../client/build"));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/pods/messages", require("./routes/pods-messages"));
app.use("/api/pods/resources", require("./routes/pods-resources"));
app.use("/api/pods", require("./routes/pods"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Redirects all other requests to main page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start Server
app.listen(PORT, console.log(`Server running on port ${PORT}`));