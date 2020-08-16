import React from "react"

import ProfilePicture from "./ProfilePicture"

function PodName(props) {
    return (
    <div onClick={() => props.onclick(props.name)}>
        <ProfilePicture name={props.name} description={props.description} src={props.src}/>
    </div>
    )
}

export default PodName;