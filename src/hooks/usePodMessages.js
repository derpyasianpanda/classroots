import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const usePodMessages = pod => {
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection("messages")
            .where("pod", "==", pod)
            .orderBy("createdAt", "desc")
            .onSnapshot(snap => {
                let newMessages = [];
                console.log("getting")
                snap.forEach(message => {
                    newMessages.push({ id: message.id, ...message.data()});
                });
                setMessages(newMessages);
            });

        return unsubscribe;
    }, [ pod ]);

    return { messages };
};

export default usePodMessages;