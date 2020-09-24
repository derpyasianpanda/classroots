import React from "react";
import { firebase, fireauth } from "../config/firebase";

const AccountButton = ({ dependents }) => {
    return dependents.filter(dependent => !!(dependent)).length === dependents.length ?
        <button onClick={() => fireauth.signOut()}>Sign Out</button>
        :
        <button
            onClick={() => {
                fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            }}
        >
            Sign In
        </button>;
};

export default AccountButton;