const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.post("/", async (req, res) => {
    let { user_id, pod_id, message } = req.query;
    if (!user_id || !pod_id || !message) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        data = {
            pod_id: pod_id,
            user_id: user_id,
            contents: message,
            timestamp: Date.now()
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

router.get("/", async (req, res) => {
    let { pod_id } = req.query;
    if (!pod_id) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const snapshot = await db.collection('message')
            .where('pod_id', '==', pod_id)
            .get();
        if (snapshot.empty) {
            res.json({
                status: "No Messages found",
                messages: []
            });
        }
        else {
            const messages = [];
            snapshot.forEach(snap => messages.push(snap.data()));
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