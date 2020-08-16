import React from 'react';
import './PodBrowsePage.css';

// Components
import PodBrowseRowItem from "../../components/PodBrowseRowItem";

class PodBrowsePage extends React.Component {
    constructor() {
        super()
        this.state = {
            availablePods: [
                { id: 1, isJoined: true, name: "5th Grade Math", subject: "Mathematics", description: "5th grade math in Spokane, Washington", tags: ["5th Grade", "Spokane", "Popular", "Math"], memberCount: 52, src: "images/smallplant.png" },
                { id: 2, isJoined: false, name: "Algebra I", subject: "Mathematics", description: "Home teaching for Algebra I", tags: ["Algebra", "National", "Popular", "Math"], memberCount: 61, src: "images/smallplant.png" },
                { id: 3, isJoined: false, name: "Seattle, Washington", subject: "Variety", description: "Local homeschooling ideas for Seattlites", tags: ["K-6", "National", "Popular"], memberCount: 11, src: "images/smallplant.png" }],
            joinedPodIDs: [1]
        }

        this.handleJoinPod = this.handleJoinPod.bind(this);
    }

    // Handles joining and leaving pods.
    // Should only be called to handle onclick events for available pods
    // so we can safely assume the id does exist
    handleJoinPod(podID) {
        console.log(this.state.availablePods);
        let podIndex = 0;
        for (let i = 0; i < this.state.availablePods.length; i++) {
            if (this.state.availablePods[i].id == podID) {
                podIndex = i;
            }
        }

        const newUpdatedPods = [...this.state.availablePods];
        let updatedPod = Object.assign({}, this.state.availablePods[podIndex]);
        updatedPod.isJoined = !updatedPod.isJoined
        newUpdatedPods[podIndex] = updatedPod

        let updatedJoinedPodIDs = [...this.state.joinedPodIDs];
        if (updatedPod.isJoined) {
            console.log("added");
            updatedJoinedPodIDs.push(newUpdatedPods[podIndex].id);
        } else {
            console.log("took away");
            updatedJoinedPodIDs = this.removeFromArray(updatedPod.id, updatedJoinedPodIDs);
        }

        console.log(updatedJoinedPodIDs);
        this.setState(state => {
            return {
                availablePods: newUpdatedPods,
                joinedPodIDs: updatedJoinedPodIDs
            };
        });
    }

    removeFromArray(x, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == x) {
                arr.splice(i, 1);
            }
        }
        return arr;
    }

    render() {
        const unjoinedPodTableItems = this.state.availablePods.map(item => {
            if (!item.isJoined) {
                return <PodBrowseRowItem id={item.id} name={item.name} subject={item.subject} description={item.description} tags={item.tags} memberCount={item.memberCount} isJoined={item.isJoined} src={item.src} onclick={this.handleJoinPod} />;
            }
        });

        const joinedPodTableItems = this.state.availablePods.map(item => {
            if (item.isJoined) {
                return <PodBrowseRowItem id={item.id} name={item.name} subject={item.subject} description={item.description} tags={item.tags} memberCount={item.memberCount} isJoined={item.isJoined} src={item.src} onclick={this.handleJoinPod} />;
            }
        });

        let podBrowseSection = {
            width: "90%",
            margin: "auto",
            marginTop: "50px",
            marginBottom: "100px"
        }

        return (
            <div>
                <section style={podBrowseSection}>
                    <h1>Your Pods</h1>
                    <table>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Tags</th>
                            <th>Members</th>
                            <th></th>
                        </tr>
                        {joinedPodTableItems}
                    </table>
                </section>

                <section style={podBrowseSection}>
                    <h1>Available Pods</h1>
                    <table>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Description</th>
                            <th>Tags</th>
                            <th>Members</th>
                            <th></th>
                        </tr>
                        {unjoinedPodTableItems}
                    </table>
                </section>

            </div>
        );
    }
}

export default PodBrowsePage;