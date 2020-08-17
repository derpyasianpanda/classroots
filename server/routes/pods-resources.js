const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

router.post("/", async (req, res) => {
    let { pod_id, content } = req.query;
    if (!pod_id || !content) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        data = {
            pod_id: pod_id,
            contents: content,
            timestamp: Date.now()
        }
        await db.collection("resource").add(data);
        res.json({
            status: "Successfully added Resource"
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
        const snapshot = await db.collection("resource")
            .where("pod_id", "==", pod_id)
            .get();
        if (snapshot.empty) {
            res.json({
                status: "No Resources found",
                messages: []
            });
        }
        else {
            const resources = [];
            snapshot.forEach(snap => resources.push(snap.data()));
            res.json({
                status: "Resources found",
                messages: resources
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

module.exports = router;