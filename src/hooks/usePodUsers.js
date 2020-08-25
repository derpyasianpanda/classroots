import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const usePodUsers = podID => {
    const [ users, setUsers ] = useState({});

    useEffect(() => {
        const unsubscribe = firestore.collection("users")
            .where("pods", "array-contains", firestore.collection("pods").doc(podID))
            .onSnapshot(snapshot => {
                let newUsers = {};
                console.log("Updating Pod Users");
                snapshot.forEach(user => {
                    newUsers[user.id] = { ...user.data() };
                });
                setUsers(newUsers);
            });

        return unsubscribe;
    }, [ podID ]);

    return users;
};

export default usePodUsers;