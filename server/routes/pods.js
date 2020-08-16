const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("This is a pods route");
});

module.exports = router;