const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../config/firebase");

router.get("/", async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server cannot retrieve user");
    }
});

router.get("/login", passport.authenticate("google", { scope: ["profile"] }));

router.get("/login/callback",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

router.get("/logout", (req, res) => {
    try {
        req.logout();
        req.session.destroy();
        res.json({ status: "Successfully" });
    } catch (error) {
        res.status(500).json({ status: "Server error in logging out" });
    }
});

module.exports = router;