import React from "react"

import Tag from "./Tag";

let imgStyle = {
    width: "50px",
    height: "50px"
}

let flexbox = {
    display: "flex",
    flexWrap: "wrap",
    width: "175px"
}

function PodBrowseRowItem(props) {
    const tags = props.tags.map(item => <Tag name={item} />);

    return (
        <tr>
            <td><img src={props.src} style={imgStyle}/></td>
            <td>{props.name}</td>
            <td>{props.subject}</td>
            <td>{props.description}</td>
            <td>
                <div style={flexbox}>
                    {tags}

                </div>

            </td>
            <td>{props.memberCount}</td>
            <td><button onClick={() => props.onclick(props.id)}> {props.isJoined ? "Leave" : "Join"} </button></td>
        </tr>
    )
}

export default PodBrowseRowItem;