import React from "react"

let imgStyle = {
    display: "inline",
    width: "75px",
    height: "75px"
}

let pStyle = {
    display: "inline",
    verticalAlign: "middle"
}

// Given profile picture componenets, will organize it into a left aligned inline element list
function ProfileLister(props) {
    return (
    <div>
        <img src={props.src} style={imgStyle}/>
        <div style={pStyle}>{props.name}</div>
    </div>
    )
}

export default ProfilePicture;