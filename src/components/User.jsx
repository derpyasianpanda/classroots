import { Context } from "../Context";
import { fireauth } from "../config/firebase";
import useUserInfo from "../hooks/useUserInfo";
import { Link, Redirect } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";

const User = props => {
    const { userID } = props.match.params;
    const user = useUserInfo(userID);
    const { user: loggedInUser } = useContext(Context);
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
            <h1>{user.displayName}'s Profile</h1>
            <h4>Email: {user.email}</h4>
        </section>
        <section>
            <h1>Pods</h1>
            <ul>
                {(pods && pods.length > 0) ?
                pods.map(pod =>
                    <li key={pod.id}>
                        <Link to={`/pods/${pod.id}`}>{pod.name}</Link>
                    </li>
                )
                : <li>This user is not in any pods</li>}
            </ul>
        </section>
        <section>
            User ID: {user.id}
            <br/>
            Admin Status: {user.admin.toString()}
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
        {loggedInUser && (userID === loggedInUser.local.uid) ? <Redirect to="/users/me"/> :
        (user ? page(user) : <section><h1>Loading...</h1></section>)}
    </main>
};

export default User;