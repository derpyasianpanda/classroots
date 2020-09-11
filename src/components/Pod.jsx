import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context.jsx";
import usePodInfo from "../hooks/usePodInfo";
import usePodUsers from "../hooks/usePodUsers";
import usePodMessages from "../hooks/usePodMessages";
import usePodResources from "../hooks/usePodResources";
import { firebase, firestore } from "../config/firebase";

const Pod = props => {
    const { podID } = props.match.params;
    const { user } = useContext(Context);
    const podInfo = usePodInfo(podID);
    const podUsers = usePodUsers(podID);
    const podMessages = usePodMessages(podID);
    const podResources = usePodResources(podID);

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

    const sendMessage = async event => {
        event.preventDefault();
        if (!userInPod(user)) return;
        await firestore.collection("messages").add({
            content: messageSend,
            pod: firestore.collection("pods").doc(podID),
            timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
            user: firestore.collection("users").doc(user.local.uid)
        });
        setMessageSend("");
    }

    const userInPod = user => {
        if (!user) return false;
        return user.pods.filter(pod => pod.id === podID).length === 1;
    }

    return podInfo ? (
        <main>
            <section>
                <h1>{podInfo.name}</h1>
                <h2>{podInfo.description}</h2>
                <h3>Grade Level: {podInfo.grade}</h3>
                <h3>Subject: {podInfo.subject}</h3>
                <h3>Location: {podInfo.location}</h3>
                <h4>Tags:</h4>
                <ul>
                    {podInfo.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                <h5>Created on {podInfo.timeCreated.toDate().toString()}</h5>
                <h6>ID: {podInfo.id}</h6>
            </section>
            {user && <section>
                {userInPod(user) ?
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
                </button>}
            </section>}
            <section>
                <h1>Messages</h1>
                {podMessages.length > 0 ?
                podMessages.map(message =>
                     <p key={message.id}>
                        {/* TODO: Find out why usePodUsers sometimes returns only on user when
                        logged in. Reproducible when going to Pod page from home screen.
                        Is this due to the fact that logging in takes up some type of
                        resource for query listening?
                        OR
                        Find a better way to retrieve usernames */}
                        <b>
                            {podMessageUsers[message.user.id] ?
                            podMessageUsers[message.user.id].displayName :
                            "Unknown"}:
                        </b> {message.content}
                    </p>
                )
                :
                <p>No Messages</p>}
                {userInPod(user) && <form onSubmit={sendMessage}>
                    <label htmlFor="messageSend">Send a Message: </label>
                    <input type="text"
                        name="messageSend" id="messageSend"
                        value={messageSend} onChange={event => setMessageSend(event.target.value)}
                    />
                </form>}
            </section>
            <section>
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
            <section>
                <h1>Users</h1>
                {Object.keys(podUsers).length > 0 ?
                Object.keys(podUsers).map(key =>
                    <li key={key}>{podUsers[key].displayName}</li>
                )
                :
                <li>No Users</li>}
            </section>
        </main>
    ) : <h1>Loading...</h1>;
};

export default Pod;
