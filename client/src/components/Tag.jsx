import React from "react"

let spanStyle = {
    width: "50px", 
    height: "25px",
    margin: "5px",
    backgroundColor: "#87CA70",
    borderRadius: "10px"
}

let pStyle = {
    fontSize: "12px",
    textAlign: "center",
    margin: "auto",
    paddingTop: "3px"
}

function Tag(props) {
    return (
        <div style={spanStyle}>
            <p style={pStyle}>{props.name}</p>
        </div>
    )
}

export default Tag;