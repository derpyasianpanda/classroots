// Dependencies
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const db = require("./config/firebase.js");

const PORT = process.env.PORT || 8000;

// Configuration
dotenv.config({ path: "./config/config.env" });
const app = express();

// Request Body Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("../client/build"));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/share", require("./routes/pods"));

// Redirects all other requests to main page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

// Start Server
app.listen(PORT, console.log(`Server running on port ${PORT}`));