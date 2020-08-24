import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const useFirestoreCollection = collectionID => {
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection(collectionID)
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
                let newDocuments = [];
                snapshot.forEach(document => {
                    newDocuments.push({ id: document.id, ...document.data() });
                });
                setDocuments(newDocuments);
            });
        return unsubscribe;
    }, [ collectionID ]);

    return documents;
};

export default useFirestoreCollection;