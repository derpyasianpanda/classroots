import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const useFirestoreCollection = collection => {
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection(collection)
            .orderBy("createdAt", "desc")
            .onSnapshot(snap => {
                let newDocuments = [];
                snap.forEach(document => {
                    newDocuments.push({id: document.id, ...document.data()});
                });
                setDocuments(newDocuments);
            });

        return unsubscribe;
    }, [ collection ]);

    return { items: documents };
};

export default useFirestoreCollection;