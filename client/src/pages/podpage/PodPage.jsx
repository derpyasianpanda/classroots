import React from 'react';
import './PodPage.css';

// Components
import ProfilePicture from "../../components/ProfilePicture";
import MessengerManager from "../../components/MessengerManager";

class PodPage extends React.Component {
    render() {
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