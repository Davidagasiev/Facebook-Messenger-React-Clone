import React from 'react'

import Logo from "./messenger.png";
import "./Welcome.scss";

export default function Welcome(props) {
    return (
        <div style={props.style} className="Welcome">

            {props.type === "group" ? 
                <div className="group">
                    <div className="img" style={{backgroundImage: `url(${props.src})`}}/>
                    
                        <h1>{props.h1}</h1>
                    
                </div>
                : 
                    <>
                        <img src={props.type === "group" ? props.src : Logo} alt="Messenger Logo"/>
                        <h1>{props.h1}</h1>
                        <h3>{props.h3}</h3>
                    </>
            }

            
            
        </div>
    )
}
