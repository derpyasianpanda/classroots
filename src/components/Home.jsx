import { Context } from "../Context";
import { firebase, fireauth } from "../config/firebase";
import React, { useContext, useState, useEffect } from "react";

const Home = () => {
    const { user } = useContext(Context);
    const [ pods, setPods ] = useState([]);

    useEffect(() => {
        const retrievePods = async () => {
            let userPods = [];
            for (let pod of user.pods) {
                userPods.push(await (await pod.get()).data());
            }
            setPods(userPods);
        };

        user ? retrievePods() : setPods([]);
    }, [ user ])

    return (
        <main>
            <h1>Hello World!</h1>
            {user ?
            <>
                <h2>Hello {user.displayName}</h2>
                <button onClick={() => fireauth.signOut()}>Sign Out</button>
            </>
            :
            <button
                onClick={() => {
                    fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
                }}
            >
                Sign In
            </button>}

            <h3>Current Pods</h3>
            <ul>
                {pods && pods.map(pod => {
                    return <li key={pod.name}>{pod.name}</li>
                })}
            </ul>
        </main>
    );
};

export default Home;