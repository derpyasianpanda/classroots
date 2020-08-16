import React, { useState, createContext, useEffect } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
    const [ profile, setProfile ] = useState(null);

    const updateProfile = async (information) => {
        // TODO: Add in updating
    };

    useEffect(() => {
        const getProfile = async () => {
            // TODO: Fetch Profile Here
        }

        getProfile();
    }, []);

    return (
        <Context.Provider value={{ profile, setProfile, updateProfile }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;