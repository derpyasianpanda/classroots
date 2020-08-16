import React from "react"

let divStyle = {
    textAlign: "left",
    marginLeft: "5%",
    paddingBottom: "10px"
}

let imgStyle = {
    display: "inline",
    width: "33px",
    height: "33px"
}

let pStyle = {
    verticalAlign: "middle",
    margin: "0",
    fontSize: "12px"
}

let pStyle2 = {
    verticalAlign: "middle",
    margin: "0",
    fontSize: "16px"
}

let pStyle3 = {
    verticalAlign: "middle",
    margin: "0",
    fontSize: "12px"
}

let flexbox = {
    display: "flex"
}

function Message(props) {
    return (
        <div style={divStyle}>
            <div style={flexbox}>
                <img src={props.src} style={imgStyle} />
                <div>
                    <p style={pStyle}>{props.name}</p>
                    <p style={pStyle2}>{props.message}</p>
                    <p style={pStyle3}>{props.timestamp}</p>
                </div>
            </div>
        </div>

    )
}

export default Message;