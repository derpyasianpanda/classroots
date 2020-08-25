import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const usePodInfo = podID => {
    const [ podInfo, setPodInfo ] = useState();

    useEffect(() => {
        const unsubscribe = firestore.collection("pods")
            .doc(podID)
            .onSnapshot(snapshot => {
                console.log("Updating Pod Info");
                setPodInfo({ id: snapshot.id, ...snapshot.data() });
            });

        return unsubscribe;
    }, [ podID ]);

    return podInfo;
};

export default usePodInfo;