const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("This is a pods route");
});

router.post("/create_pod", async (req, res) => {
    let { name, subject, description, location, grade, tags } = req.query;
    if (!name || !subject) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        data = {
            name: name,
            description: description,
            subject: subject,
            grade: grade,
            location: location,
            tags: tags ? tags : []
        }
        const res = await db.collection('pod').add(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

module.exports = router;