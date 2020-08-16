import React from 'react';
import './LandingPage.css';
import { Context } from "../../Context";
import { Link } from "react-router-dom"

class LandingPage extends React.Component {
    static contextType = Context;
    render() {
        let { profile } = this.context;
        return (
            <div id="body">

                <section id="topSection">
                    <img src="images/classroots.gif" className="logo" />
                    <div id="mainTitle">
                        <p>A grassroots approach to home learning</p>
                        {profile ? <p>Welcome {profile.displayName}</p> :
                        // Needs to be an anchor tag b/c the login directs outside of react
                        <a href="/api/users/login"><button>Login with Google</button></a>}
                        <br/>
                        {profile ? <button
                            onClick={async () => {
                                await fetch("/api/users/logout",
                                    { credentials: "include" });
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button> : ""}
                        {profile ? <><br/><Link to="/message">Go to the app!</Link></> :
                        ""}
                    </div>
                </section>


                <section className="contentSection">
                    <img src="images/smallplant.png" className="smallImage" />
                    <div className="formatBody">
                        <h1>Grassroots + Classroom</h1>
                        <p><i>Classroots</i> allows parents of homeschooled or hybrid-schooled students
                        K-6 to connect to discuss curriculum and education opportunities for
                        their children. They can connect via shared locations, interests, or
                        educational styles. For example, one such community might be third grade students from WA state.</p>
                    </div>

                </section>

                <section className="contentSection">
                    <div className="formatBody">
                        <h1>What are Pods?</h1>
                        <p><i>Pods</i> are how Classroots brings people together. Pods are groups of 5-50 parents who are
                        able to connect and share educational resources for their children. Each Pod is dedicated and tailored
                        to specific children needs, and offers a convenient way for parents to connect through group messaging
                        and sharing. New Pods are always forming and evolving so that parents are readily able to find
                        the right communities.</p>
                    </div>
                    <img src="images/pod.png" className="smallImage" />

                </section>

                <section className="contentSection">
                    <div className="formatBody">
                        <h1>Easy, helpful, socially distanced communities</h1>
                        <p>Are you a parent worried about sending your child to school? Not sure about the best way to
                            edcuate from home? <i>Classroots</i> provides a way for you to connect with other parents about
                            the topics you care about. Click the button below to sign up and join a Pod!
                        </p>
                    </div>
                </section>
                <section className="contentSection" style={{justifyContent: "center"}}>
                    {!profile ?
                            <a href="/api/users/login"><button>Login with Google</button></a>
                        :
                            <p>Welcome {profile.displayName} <br/>
                            <Link to="/message">Go to the app!</Link></p>
                    }

                    {profile ? <></> :
                    ""}
                </section>
            </div>
        )
    }
}

export default LandingPage;
