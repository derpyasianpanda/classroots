const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.get("/", async (req, res) => {
    res.send("This is a pods/messages route");
});

router.post("/send", async (req, res) => {
    let { user_id, pod_id, message } = req.query;
    if (!user_id || !pod_id || !message) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        data = {
            pod_id: pod_id,
            user_id: user_id,
            contents: message,
            timestamp: Date.now();
        }
        await db.collection('message').add(data);
        res.json({
            status: "Successfully sent Message"
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
        const messages = await db.collection('message')
            .where('pod_id', '==', pod_id)
            .get();
        if (messages.empty) {
            res.json({
                status: "No Messages found",
                messages: []
            });
        }
        else {
            res.json({
                status: "Messages found",
                messages: messages
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

module.exports = router;