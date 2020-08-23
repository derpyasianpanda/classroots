// Dependencies
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const dotenv = require("dotenv");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const FirestoreStore = require("firestore-store")(session);

dotenv.config({ path: "./config/config.env" });

const db = require("./config/firebase");
const configurePassport = require("./config/passport");
const PORT = process.env.PORT || 8000;

// Configuration
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(
    session({
        store: new FirestoreStore({
            database: db
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);
configurePassport(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Request Body Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("../client/build"));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/pods/messages", require("./routes/pods-messages"));
app.use("/api/pods/resources", require("./routes/pods-resources"));
app.use("/api/pods", require("./routes/pods"));

// Redirects all other requests to main page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start Server
server.listen(PORT, console.log(`Server running on port ${PORT}`));