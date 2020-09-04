import { Context } from "../Context";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { fireauth } from "../config/firebase";

import "./Profile.css"

const Profile = () => {
    const { user } = useContext(Context);

    const page = user => (<>
        <section>
            <h1>Hello {user.displayName}</h1>
            <img
                style={{ marginTop: "25px", width: "300px", borderRadius: "100%" }}
                src={user.local.photoURL}
                alt="Profile Avatar"
            />
            <br/>
            This is a user page
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