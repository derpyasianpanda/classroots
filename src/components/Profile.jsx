import { Context } from "../Context";
import { Link } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { fireauth } from "../config/firebase";

const Profile = () => {
    const { user } = useContext(Context);
    const [ pods, setPods ] = useState([]);

    useEffect(() => {
        const getUserPods = async user => {
            if (!user) return;
            console.log("Refreshing Pods");
            const userPods = [];
            for (const pod of user.pods) {
                userPods.push({id: pod.id, ...(await pod.get()).data()})
            }
            setPods(userPods);
        };

        getUserPods(user);
    }, [ user ]);

    const page = user => (<>
        <section>
            <h1>Hello {user.displayName}</h1>
            <img
                style={{ marginTop: "25px", width: "300px", borderRadius: "100%" }}
                src={user.local.photoURL}
                alt="Profile Avatar"
            />
            <br/>
        </section>
        <section>
            <h1>Your Pods</h1>
            <ul>
                {(pods && pods.length > 0) ?
                pods.map(pod =>
                    <li key={pod.id}>
                        <Link to={`/pods/${pod.id}`}>{pod.name}</Link>
                    </li>
                )
                : <li>You are not in any pods</li>}
            </ul>
        </section>
        <section>
            Email: {user.email}
            <br/>
            <Link
                to="/"
                onClick={() => fireauth.signOut()}
            >
                    Sign Out
            </Link>
        </section>
    </>);

    return <main className="profile">
        {user ? page(user) : <section><h1>Loading...</h1></section>}
    </main>
};

export default Profile;