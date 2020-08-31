import { Context } from "../Context";
import { Link } from "react-router-dom";
import { firebase, fireauth } from "../config/firebase";
import React, { useContext, useEffect, useState } from "react";

const Navigation = () => {
    const [ transparent, setTransparent ] = useState(true);
    const { user } = useContext(Context);

    useEffect(() => {
        const changeTransparency = () => {
            setTransparent(window.scrollY < window.innerHeight * 0.05);
        }

        window.addEventListener("scroll", changeTransparency);
    }, []);

    return <nav className={transparent ? "transparent" : ""}>
            <Link to="/">Home</Link>
            <Link to="/pods">Pods</Link>
            <Link to="/users">Users</Link>
            {user ?
            <Link to="/" onClick={() => fireauth.signOut()}>
                Hello {user.displayName}
            </Link> :
            <Link to="/"
            onClick={() => {
                    fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            }}
            >
                Register/Sign In
            </Link>}
    </nav>
};

export default Navigation;