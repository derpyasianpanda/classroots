import React, { useContext } from "react";
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

    const userInPod = user => {
        return user.pods.filter(pod => pod.id === podID).length === 1;
    }

    return podInfo ? (
        <main>
            <h1>Welcome to {podInfo.name}</h1>
            <h2>{podInfo.description}</h2>
            <h3>Grade Level: {podInfo.grade}</h3>
            <h3>Subject: {podInfo.subject}</h3>
            <h3>Location: {podInfo.location}</h3>
            <h4>
                Tags:
                <ul>
                    {podInfo.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
            </h4>
            <h5>Created on {podInfo.timeCreated.toDate().toString()}</h5>
            <h6>ID: {podInfo.id}</h6>
            <section>
                <h1>Messages</h1>
                {podMessages.length > 0 && Object.keys(podUsers).length > 0 ?
                podMessages.map(message =>
                     <p key={message.id}>
                        {/* TODO: Find out why usePodUsers sometimes returns only on user when
                        logged in. Reproducible when going to Pod page from home screen.
                        Is this due to the fact that logging in takes up some type of
                        resource for query listening?
                        OR
                        Find a better way to retrieve usernames */}
                        <b>
                            {podUsers[message.user.id] ?
                            podUsers[message.user.id].displayName :
                            "Unknown"}:
                        </b> {message.content}
                    </p>
                )
                :
                <p>No Messages</p>}
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
        </main>
    ) : <h1>Loading...</h1>;
};

export default Pod;
