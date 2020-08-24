import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const usePodResources = podID => {
    const [ resources, setResources ] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore.collection("resources")
            .where("pod", "==", firestore.collection("pods").doc(podID))
            .orderBy("timeCreated", "desc")
            .onSnapshot(snapshot => {
                let newResources = [];
                console.log("Updating Pod Resources");
                snapshot.forEach(resource => {
                    newResources.push({ id: resource.id, ...resource.data()});
                });
                setResources(newResources);
            });
        return unsubscribe;
    }, [ podID ]);

    return resources;
};

export default usePodResources;