const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.send("This is a pods/messages route");
});

router.post("/add", async (req, res) => {
    let { pod_id, content } = req.query;
    if (!pod_id || !content) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        data = {
            pod_id: pod_id,
            contents: content,
            timestamp: Date.now();
        }
        await db.collection('resource').add(data);
        res.json({
            status: "Successfully added Resource"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

router.get("/get", async (req, res) => {
    let { pod_id } = req.query;
    if (!pod_id) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const resources = await db.collection('resource')
            .where('pod_id', '==', pod_id)
            .get();
        if (resources.empty) {
            res.json({
                status: "No Resources found",
                messages: []
            });
        }
        else {
            res.json({
                status: "Resources found",
                messages: messages
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

module.exports = router;