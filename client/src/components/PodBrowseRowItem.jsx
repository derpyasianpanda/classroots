import React from "react"

function PodBrowseRowItem(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.subject}</td>
            <td>{props.description}</td>
            <td>{props.memberCount}</td>
            <td><button onClick={() => props.handleOnClick(props.id)}>Join</button></td>
        </tr>
    )
}

export default PodBrowseRowItem;