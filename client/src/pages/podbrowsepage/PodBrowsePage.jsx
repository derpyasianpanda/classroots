import React from 'react';
import './PodBrowsePage.css';

// Components
import PodBrowseRowItem from "../../components/PodBrowseRowItem";

class PodBrowsePage extends React.Component {
    constructor() {
        super()
        this.state = {
            availablePods: [{ id: 1, isJoined: false, name: "5th Grade Math", subject: "Mathematics", description: "5th grade math in Spokane, Washington", memberCount: 52, src: "images/smallplant.png" }, { id: 2, isJoined: false, name: "Algebra I", subject: "Mathematics", description: "Home teaching for Algebra I", memberCount: 61, src: "images/smallplant.png" }, { id: 3, isJoined: false, name: "Seattle, Washington", subject: "Variety", description: "Local homeschooling ideas for Seattlites", memberCount: 11, src: "images/smallplant.png" }],
        }

        this.handleJoinPod = this.handleJoinPod.bind(this);
    }

    handleJoinPod(podID) {
        let pod = this.doesPodArrayContainID(podID, this.state.availablePods);

        // If we found a matching pod ID, add it to the joined pods.
        if (pod) {
            this.setState(
                {
                    joinedPods: [...this.state.joinedPods, pod]
                }
            );
        }
    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    // Checks an array of objects for their id field
    // and returns the object if it finds a matching id
    // or null otherwise
    doesPodArrayContainID(podID, podArray) {
        let pod = {};
        for (let i = 0; i < podArray.length; i++) {
            if (podArray[i].id == podID) {
                pod = podArray[i];
            }
        }

        if (this.isEmpty(pod)) {
            return null;
        }
        return pod;
    }

    render() {
        const podTableItems = this.state.availablePods.map(item => <PodBrowseRowItem name={item.name} subject={item.subject} description={item.description} memberCount={item.memberCount} handleOnClick={this.handleJoinPod} />);
        const joinedPods = this.state.joinedPods.map(item => <PodBrowseRowItem name={item.name} subject={item.subject} description={item.description} memberCount={item.memberCount} handleOnClick={this.handleJoinPod} />);

        return (
            <div>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Members</th>
                    </tr>
                    {podTableItems}
                </table>

                <h1>Joined Pods</h1>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Members</th>
                    </tr>
                    {joinedPods}
                </table>
            </div>
        );
    }
}

export default PodBrowsePage;