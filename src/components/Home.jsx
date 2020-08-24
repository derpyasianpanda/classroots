import { Context } from "../Context";
import { firebase, fireauth } from "../config/firebase";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const { user } = useContext(Context);
    const [ podsInfo, setPodsInfo ] = useState([]);

    useEffect(() => {
        const retrievePods = async () => {
            let newPodsInfo = [];
            for (let pod of user.pods) {
                newPodsInfo.push({ id: pod.id, ...await (await pod.get()).data() });
            }
            setPodsInfo(newPodsInfo);
        };

        user ? retrievePods() : setPodsInfo([]);
    }, [ user ]);

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
                {podsInfo && podsInfo.map(podInfo => {
                    return (
                        <li key={podInfo.name}>
                            <Link to={`/pods/${podInfo.id}`}>
                                <h4>Name: </h4><p>{podInfo.name}</p>
                                <h5>Description: </h5><p>{podInfo.description}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default Home;