const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../config/firebase");

router.get("/", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.json(req.user);
    }
    try {
        const snapshot = await db.collection('user')
            .where('googleID', '==', id)
            .get();
        let user = [];
        snapshot.forEach(snap => user.push(snap.data()));
        res.json({
            status: user.length > 0 ? "Users found" : "No users :(",
            user: user[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
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
        res.json({ status: "Successfully" });
    } catch (error) {
        res.status(500).json({ status: "Server error in logging out" });
    }
});

module.exports = router;