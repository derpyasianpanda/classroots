import React, { useState, createContext, useEffect } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [ profile, setProfile ] = useState(null);

    const updateProfile = async (information) => {
        // TODO: Add in updating
    };

    const getProfile = async () => {
        try {
            const response =
                await fetch("/api/users/", { credentials: "include" });
            if (!response.ok) {
                console.log("Could not find an existing account session")
            } else {
                setProfile(await response.json());
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Context.Provider value={{ profile, setProfile, getProfile, updateProfile }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;