import React from 'react'

import Logo from "./messenger.png";
import "./Welcome.scss";

export default function Welcome(props) {
    return (
        <div style={props.style} className="Welcome">
            <img src={Logo} alt="Messenger Logo"/>

            <h1>Welcome to Facebook Messenger Clone</h1>
            <h3>Made by David Agasiev</h3>
        </div>
    )
}
