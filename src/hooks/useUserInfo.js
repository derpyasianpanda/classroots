import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

const useUserInfo = userID => {
    const [ userInfo, setUserInfo ] = useState();

    useEffect(() => {
        const unsubscribe = firestore.collection("users")
            .doc(userID)
            .onSnapshot(snapshot => {
                console.log("Updating User Info");
                setUserInfo({ id: snapshot.id, ...snapshot.data() });
            });

        return unsubscribe;
    }, [ userID ]);

    return userInfo;
};

export default useUserInfo;