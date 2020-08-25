import React from "react";
import { Link } from "react-router-dom";
import useFirestoreCollection from "../hooks/useFirestoreCollection";

const Pods = () => {
    const pods = useFirestoreCollection("pods", "timeCreated", "desc");

    return (
        <main>
            <h1>All Pods</h1>
            <ul>
                {pods ? pods.map(pod =>
                    <li key={pod.id}>
                        <Link to={`pods/${pod.id}`}>
                            <p>
                                <b>Name:</b> {pod.name}
                            </p>
                            <p>
                                <b>Description:</b> {pod.description}
                            </p>
                            <p>
                                <b>Subject:</b> {pod.subject}
                            </p>
                        </Link>
                    </li>
                ) : <h2>Loading...</h2>}
            </ul>
        </main>
    );
};

export default Pods;