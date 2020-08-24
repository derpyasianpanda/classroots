import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const useFirestoreCollection = collection => {
    const [ items, setItems ] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection(collection)
            .orderBy("createdAt", "desc")
            .onSnapshot(snap => {
                let items = [];
                snap.forEach(item => {
                    items.push({id: item.id, ...item.data()});
                });
                setItems(items);
            });

        return unsubscribe;
    }, [collection]);

    return { items };
};

export default useFirestoreCollection;