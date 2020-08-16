import React from "react"

let divStyle = {
    textAlign: "left",
    marginLeft: "5%",
    paddingTop: "10px",
    paddingBottom: "10px"
}

let imgStyle = {
    width: "50px",
    height: "50px"
}

let pStyle = {
    verticalAlign: "middle",
    fontSize: "24px"
}

let pStyle2 = {
    verticalAlign: "middle",
    fontSize: "12px"
}

let flexbox = {
    display: "flex"
}

function ProfilePicture(props) {
    return (
        <div style={divStyle}>
            <div style={flexbox}>
                <img src={props.src} style={imgStyle} />
                <div>
                    <div style={pStyle}>{props.name}</div>
                    <div style={pStyle2}>{props.description}</div>
                </div>
            </div>



        </div>
    )
}

export default ProfilePicture;