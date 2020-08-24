import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const usePodMessages = podID => {
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection("messages")
            .where("pod", "==", firestore.collection("pods").doc(podID))
            .orderBy("timeCreated", "desc")
            .onSnapshot(snapshot => {
                let newMessages = [];
                console.log("Updating Pod Messages");
                snapshot.forEach(message => {
                    newMessages.push({ id: message.id, ...message.data()});
                });
                setMessages(newMessages);
            });
        return unsubscribe;
    }, [ podID ]);

    return messages;
};

export default usePodMessages;