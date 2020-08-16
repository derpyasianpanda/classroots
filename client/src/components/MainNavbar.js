import React from 'react';

// React Bootstrap Components
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// React Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const MainNavbar = (props) => {

    let divStyle = {
        height: "100px",
        backgroundColor: "#87CA70"
    }

    let ulStyle = {
        listStyleType: "none",
        margin: "0",
        padding: "0",
        overflow: "hidden",
        backgroundColor: "#87CA70"
    }

    let liStyle = {
        float: "left"
    }

    let aStyle = {
        display: "block",
        color: "white",
        textAlign: "center",
        padding: "14px 16px",
        textDecoration: "none",
        color: "#FCFDFC",
        fontFamily: "Oswald, sans-serif",
        fontSize: "20px"
    }

    let buttonStyle = {
        display: "inline",
        color: "#FCFDFC",
        fontFamily: "Oswald, sans-serif",
        fontSize: "20px",
        fontStyle: "bold",
        backgroundColor: "transparent",
        textAlign: "center",
        textDecoration: "none",
        borderColor: "#FCFDFC",
        borderRadius: "30px",
        borderWidth: "2px",
        margin: "10px",
        marginRight: "10px"
    }

    let imgStyle = {
        width: "100px",
        height: "100px",
        display: "inline"
    }


    return (
        <div style={divStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}><img style={imgStyle} src="images/classroots.gif" /></li>
                <li style={liStyle}><Link to="/message" style={aStyle}><button style={buttonStyle}>Your Pods</button></Link></li>
                <li style={liStyle}><Link to="/browse" style={aStyle}><button style={buttonStyle}>Browse Pods</button></Link></li>
            </ul>
        </div>
    );
};

export default MainNavbar;

