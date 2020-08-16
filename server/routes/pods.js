const express = require("express");
const router = express.Router();
const db = require("../config/firebase");

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
        const pod = await db.collection('pod').add(data);
        res.json({
            status: "Successfully created Pod",
            id: pod.id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

router.post("/search_pods", async (req, res) => {
    let { grade, location, tags } = req.query;
    if (!grade || !location) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const pods = await db.collection('pod')
            .where('grade', '==', grade)
            .where('location', 'in', [location, null])
            .where('tags', 'array-contains-any', tags)
            .get();
        if (pods.empty) {
            res.json({
                status: "No Pods found",
                pods: []
            });
        }
        else {
            res.json({
                status: "Pods found",
                pods: pods
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

router.post("/add_user", async (req, res) => {
    let { pod_id, user_id } = req.query;
    if (!grade || !location) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const userRef = db.collection('user').doc(user_id);
        await userRef.update({
          pods: admin.firestore.FieldValue.arrayUnion(pod_id)
        });
        res.json({
            status: "Added User to Pod"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

module.exports = router;