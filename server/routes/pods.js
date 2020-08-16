const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const db = require("../config/firebase");

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
    let { grade, location, tags } = req.query;
    if (!grade || !location) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        let snapshot = db.collection('pod')
            .where('grade', '==', grade)
            .where('location', '==', location)
        snapshot = tags ? snapshot.where("tags", "array-contains", tags) : snapshot;
        snapshot = await snapshot.get();
        if (snapshot.empty) {
            res.json({
                status: "No Pods found",
                pods: []
            });
        }
        else {
            let pods = [];
            snapshot.forEach(snap => pods.push(snap.data()));
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

router.post("/users", async (req, res) => {
    let { pod_id, user_id } = req.query;
    if (!pod_id || !user_id) {
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

router.get("/users", async (req, res) => {
    let { pod_id  } = req.query;
    if (!pod_id) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const snapshot = await db.collection('user')
            .where('pods', 'array-contains', pod_id)
            .get();
        let users = [];
        snapshot.forEach(snap => users.push(snap.data()));
        res.json({
            status: "Users found",
            users: users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

router.put("/tag", async (req, res) => {
    let { pod_id, tag } = req.query;
    if (!pod_id || !tag) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const podRef = db.collection('pod').doc(pod_id);
        await podRef.update({
            tags: admin.firestore.FieldValue.arrayUnion(tag)
        });
        res.json({
            status: "Added Tag to Pod"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

router.get("/get_pods", async (req, res) => {
    let { user_id } = req.query;
    if (!user_id) {
        return res.status(400).json({ status: "Missing query parameters" })
    }
    try {
        const snapshot = await db.collection('user')
            .where('user_id', '==', user_id)
            .get();
        let pod_ids = [];
        snapshot.forEach(snap => pod_ids = snap.data().pods);
        let pods = [];
        pod_ids.forEach(async function(pod_id) {
            const pod = await db.collection('pod')
                .where('pod_id', '==', pod_id)
                .get();
            pods.push(pod);
        });
        res.json({
            status: "Pods found",
            pods: pods
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Server could not process the request"});
    }
});

module.exports = router;