import { Context } from "../Context";
import { firebase, fireauth } from "../config/firebase";
import React, { useContext } from "react";

import "./Home.css";

const Home = () => {
    const { user } = useContext(Context);

    return (
        <main className="home">
            <section id="section-title">
                <img src="resources/classroots-logo.gif" alt="Classroots Logo"/>
                <h1>A grassroots approach to home learning</h1>
            </section>
            <section className="info">
                <img style={{ width: "400px" }} src="resources/smallplant.png" alt="Small Plant"/>
                <div>
                    <h1>
                        Grassroots + Learning
                    </h1>
                    <p>
                        <em>Classroots</em> allows parents of homeschooled or hybrid schooled
                        students to connect and discuss cirriculum and education opportunities
                        for their children. These connections can be based of of various things
                        like location, interest, or subject.
                    </p>
                </div>
            </section>
            <section className="info">
                <div>
                    <h1>What are pods?</h1>
                    <p>
                        <em>Pods</em> are how Classroots brings people together. Pods are groups of 5-50
                        parents who are able to connect and share educational resources for their
                        children. Each Pod is dedicated and tailored to specific children needs,
                        and offers a convenient way for parents to connect through group
                        messaging and sharing. New Pods are always forming and evolving so that
                        parents are readily able to find the right communities.
                    </p>
                </div>
                <img style={{ width: "400px" }} src="resources/pod.png" alt="Pea Pod"/>
            </section>

            <section>
                <h1>{user ? `Hello ${user.displayName}` : "Get Started"}</h1>
                {user ?
                <button onClick={() => fireauth.signOut()}>Sign Out</button>
                :
                <button
                    onClick={() => {
                        fireauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
                    }}
                >
                    Sign In
                </button>}
            </section>

            {/* <Link to="/pods">All Pods</Link>
            <Link to="/users">All Users</Link> */}

            {/* <h3>Current Pods</h3>
            <ul>
                {podsInfo && podsInfo.map(podInfo => {
                    return (
                        <li key={podInfo.name}>
                            <Link to={`/pods/${podInfo.id}`}>
                                <h4>Name: </h4><p>{podInfo.name}</p>
                                <h5>Description: </h5><p>{podInfo.description}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul> */}
        </main>
    );
};

export default Home;