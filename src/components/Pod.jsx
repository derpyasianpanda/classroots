import { Context } from "../Context.jsx";
import usePodInfo from "../hooks/usePodInfo";
import usePodUsers from "../hooks/usePodUsers";
import usePodMessages from "../hooks/usePodMessages";
import usePodResources from "../hooks/usePodResources";
import { firebase, firestore } from "../config/firebase";
import React, { useContext, useEffect, useState, useRef } from "react";

import "./Pod.css";

const Pod = props => {
    const { podID } = props.match.params;
    const { user } = useContext(Context);
    const podInfo = usePodInfo(podID);
    const podUsers = usePodUsers(podID);
    const podMessages = usePodMessages(podID);
    const podResources = usePodResources(podID);

    const messageBox = useRef();

    const [ messageSend, setMessageSend ] = useState("");
    const [ podMessageUsers, setPodMessageUsers ] = useState({});

    useEffect(() => {
        const getMessageUsers = async podMessages => {
            const podMessageUsers = {};
            for (const message of podMessages) {
                const messageUser = (await message.user.get()).data();
                podMessageUsers[message.user.id] = messageUser;
            }
            setPodMessageUsers(podMessageUsers);
        };

        podMessages && getMessageUsers(podMessages);
    }, [ podMessages ]);

    useEffect(() => {
        if (messageBox.current) messageBox.current.scrollTop = messageBox.current.scrollHeight;
    }, [ messageBox, messageSend, podMessages ]);

    const getFormattedTime = date => {
        return `${date.getUTCHours().toString().padStart(2, "0")}:
            ${date.getUTCMinutes().toString().padStart(2, "0")}
            on ${date.toDateString()}`;
    };

    const sendMessage = async event => {
        event.preventDefault();
        if (!userInPod(user)) return;
        if (messageSend.trim().length > 0) {
            await firestore.collection("messages").add({
                content: messageSend,
                pod: firestore.collection("pods").doc(podID),
                timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
                user: firestore.collection("users").doc(user.local.uid)
            });
            setMessageSend("");
        }
    };

    const userInPod = user => {
        if (!user) return false;
        return user.pods.filter(pod => pod.id === podID).length === 1;
    }

    return podInfo ? (
        <main className="pod-info">
            <section className="title">
                <h1>{podInfo.name}</h1>
                <p>{podInfo.description}</p>
                <h3>Grade Level: {podInfo.grade}</h3>
                <h3>Subject: {podInfo.subject}</h3>
                <h3>Location: {podInfo.location}</h3>
                {user && (userInPod(user) ?
                <button
                    onClick={async () => await firestore.collection("users")
                        .doc(user.local.uid).update({
                            pods: firebase.firestore.FieldValue
                                .arrayRemove(firestore.collection("pods").doc(podID))
                        })
                    }
                >
                    Leave Pod
                </button>
                :
                <button
                    onClick={async () => await firestore.collection("users")
                        .doc(user.local.uid).update({
                            pods: firebase.firestore.FieldValue
                                .arrayUnion(firestore.collection("pods").doc(podID))
                        })
                    }
                >
                    Join Pod
                </button>)}
            </section>
            <section className="messages">
                <h1>Messages</h1>
                <ul className="message-box" ref={messageBox}>
                    {podMessages.length > 0 ?
                    podMessages.map(message =>
                         <li key={message.id}>
                            {/* TODO: Find out why usePodUsers sometimes returns only on user when
                            logged in. Reproducible when going to Pod page from home screen.
                            Is this due to the fact that logging in takes up some type of
                            resource for query listening?
                            OR
                            Find a better way to retrieve usernames
                            ALSO
                            Find out why updated messages don't actually have their dates
                            immediately */}
                            <b className={user &&
                                (message.user.id === user.local.uid ? "user-message" : "")}
                            >
                                {podMessageUsers[message.user.id] ?
                                podMessageUsers[message.user.id].displayName :
                                "Unknown"}:
                            </b> {message.content}
                            {message.timeCreated &&
                            <em> @ {getFormattedTime(message.timeCreated.toDate())}</em>}
                        </li>
                    )
                    :
                    <li>No Messages</li>}
                </ul>
                {userInPod(user) && <form onSubmit={sendMessage}>
                    <label htmlFor="messageSend">Send a Message: </label>
                    <input type="text"
                        name="messageSend" id="messageSend"
                        value={messageSend} onChange={event => setMessageSend(event.target.value)}
                    />
                </form>}
            </section>
            <section className="resources">
                <h1>Resources</h1>
                {podResources.length > 0 ?
                podResources.map(resource =>
                    <p key={resource.id}>
                        <i>{resource.timeCreated.toDate().toDateString()}:</i> {resource.content}
                    </p>
                )
                :
                <p>No Resources</p>}
            </section>
            <section className="users">
                <h1>Users</h1>
                {Object.keys(podUsers).length > 0 ?
                Object.keys(podUsers).map(key =>
                    <li key={key}>{podUsers[key].displayName}</li>
                )
                :
                <li>No Users</li>}
            </section>
            <section className="info">
                <h4>Tags:</h4>
                <ul>
                    {podInfo.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <h5>Created on {podInfo.timeCreated.toDate().toString()}</h5>
                <h6>ID: {podInfo.id}</h6>
            </section>
        </main>
    ) : <h1>Loading...</h1>;
};

export default Pod;
