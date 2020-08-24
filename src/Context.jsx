import React, { useState, createContext, useEffect } from "react";
import { firebase, fireauth, firestore } from "./config/firebase";

const Context = createContext();

const ContextProvider = props => {
    const [ user, setUser ] = useState();

    useEffect(() => {
        let unsubscribe = () => {};

        fireauth.onAuthStateChanged(async localUserData => {
            unsubscribe();
            if (localUserData) {
                const userRef = firestore.collection("users").doc(localUserData.uid);

                (await userRef.get()).exists || await userRef.set({
                    displayName: localUserData.displayName,
                    email: localUserData.email,
                    timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
                    pods: [],
                });

                unsubscribe = userRef.onSnapshot(snapshot => {
                    setUser({
                        local: { ...localUserData },
                        ...snapshot.data()
                    });
                });
            } else {
                unsubscribe = () => {};
                setUser(localUserData);
            }
        });

        return unsubscribe;
    }, []);

    return <Context.Provider value = {{ user }}>
        {props.children}
    </Context.Provider>;
};

export { Context, ContextProvider };