import React from 'react';
import './PodPage.css';
import { Context } from "../../Context";

// Components
import ProfilePicture from "../../components/ProfilePicture";
import MessengerManager from "../../components/MessengerManager";

class PodPage extends React.Component {
    static contextType = Context
    render() {
        let { profile } = this.context;
        console.log(profile)
        return (
            <div>
                <div>
                    <div id="headerSection">
                        <h1>Pod Page</h1>
                        <p>hello</p>
                    </div>


                    <MessengerManager />

                </div>

            </div>
        )
    }
}

export default PodPage;