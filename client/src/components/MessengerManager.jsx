// Messenger manager will handle state for messaging.
// It will track: 
//
// what pods we can currently access
// what pod we are currently messaging on
// what users are currently in the pod
// who is the current user
// what messages exist already in this pod

import React from "react"

// Components
import ProfilePicture from "./ProfilePicture";
import PodName from "./PodName";
import Message from "./Message";

import InputGroup from 'react-bootstrap/InputGroup'

let body = {
    display: "flex",
    flexWrap: "wrap",
    margin: "auto"
}

let podListDivStyle = {
    width: "20%",
    height: "600px",
    backgroundColor: "#FCFDFC",
    margin: "auto"
}

let messengerDivStyle = {
    width: "60%",
    height: "600px",
    backgroundColor: "#87CA70",
    margin: "auto"
}

let podUsersDivStyle = {
    width: "20%",
    height: "600px",
    backgroundColor: "#FCFDFC",
    margin: "auto"
}

let messageHistoryStyle = {
    width: "800px",
    height: "400px",
    overflow: "auto"
}

let inputStyle = {
    width: "80%"
}

let buttonStyle = {
    fontSize: "16px",
    padding: "4px 32px",
    borderWidth: "2px"
}

let h1Style = {
    textAlign: "left",
    paddingLeft: "30px"
}

class MessengerManager extends React.Component {
    constructor() {
        super()
        this.state = {
            availablePods: [{ name: "5th Grade Math", description: "5th grade math in Spokane, Washington", src: "images/smallplant.png" }, { name: "Algebra I", description: "Home teaching for Algebra I", src: "images/smallplant.png" }, { name: "Seattle, Washington", description: "Local homeschooling ideas for Seattlites", src: "images/smallplant.png" }],
            currentPodName: "5th Grade Math",
            currentPodUsers: [{ name: "Judah Wiley", src: "images/smallplant.png" }, { name: "Anushka Narvekar", src: "images/smallplant.png" }, { name: "Joshua Maza", src: "images/smallplant.png" }],
            existingMessages: [{ userName: "Judah", src: "images/smallplant.png", messageContent: "Heyoo whaddup peasents", timeStamp: "8/16/2020 9:03 PM" }, { userName: "KV", src: "images/smallplant.png", messageContent: ">:(", timeStamp: "8/16/2020 9:05 PM" }, { userName: "Joshua", src: "images/smallplant.png", messageContent: "no u", timeStamp: "8/16/2020 9:06 PM" }, { userName: "Anushka", src: "images/smallplant.png", messageContent: "henlo", timeStamp: "8/16/2020 9:10 PM" }],
            currentUsername: "Joshua",
            currentlyTypedMessage: ""
        }
        this.changePod = this.changePod.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    // Changes view and messaging activity to the target pod
    changePod(targetPodName) {
        this.setState(prevState => {
            return {
                currentPodName: targetPodName
            }
        });
    }

    // Changes the currently typed message
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Sends a new message. Will update the chatlog.
    sendMessage() {
        let today = new Date();
        let currentDate = today.toJSON().slice(0,10).replace(/-/g,'/');
        let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        this.setState(
            {
                existingMessages: [...this.state.existingMessages, { userName: this.state.currentUsername, src: "images/smallplant.png", messageContent: this.state.currentlyTypedMessage, timeStamp: currentDate + " " + currentTime}],
                currentlyTypedMessage: ""
            }
        );
    }

    render() {

        const currentPodListItems = this.state.availablePods.map(item => <PodName name={item.name} description={item.description} src={item.src} onclick={this.changePod} />);
        const currentPodUsersItems = this.state.currentPodUsers.map(item => <ProfilePicture name={item.name} src={item.src} />);
        const currentMessages = this.state.existingMessages.map(item => <Message name={item.userName} src={item.src} message={item.messageContent} timestamp={item.timeStamp}/>);

        return (
            <div style={body}>
                <div style={podListDivStyle}>
                    <h1 style={h1Style}>Your Pods</h1>
                    {currentPodListItems}
                </div>
                <div style={messengerDivStyle}>
                    <h1 style={h1Style} >{this.state.currentPodName}</h1>
                    <div style={messageHistoryStyle}>
                        {currentMessages}
                    </div>


                    <input name="currentlyTypedMessage" value={this.state.currentlyTypedMessage} style={inputStyle} onChange={this.handleInputChange} />
                    <button style={buttonStyle} onClick={this.sendMessage}>Send</button>
                </div>
                <div style={podUsersDivStyle}>
                <h1 style={h1Style}>People</h1>
                    {currentPodUsersItems}
                </div>

            </div>
        )
    }
}

export default MessengerManager;