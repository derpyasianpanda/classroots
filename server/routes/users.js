const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("This is a users route");
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