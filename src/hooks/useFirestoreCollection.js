import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const useFirestoreCollection = (collectionID, sortBy = null, order = null) => {
    const [ documents, setDocuments ] = useState([]);

    useEffect(() => {
        let collection = firestore.collection(collectionID);
        /* Not using a single orderArray and spreading it b/c hook dependency array is
        based on strict equality. Every time the array is passed it, the values would be
        equal but not necessarily the array */
        collection = sortBy && order ? collection.orderBy(sortBy, order) : collection;
        const unsubscribe = collection
            .onSnapshot(snapshot => {
                let newDocuments = [];
                console.log("Retreiving new Documents");
                snapshot.forEach(document => {
                    newDocuments.push({ id: document.id, ...document.data() });
                });
                setDocuments(newDocuments);
            });

        return unsubscribe;
    }, [ collectionID, sortBy, order ]);

    return documents;
};

export default useFirestoreCollection;