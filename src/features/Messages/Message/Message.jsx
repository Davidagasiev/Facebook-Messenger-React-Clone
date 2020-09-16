import React from 'react'

import "./Message.scss";

export default function Message(props) {
    return (
        <div>
            <div>
                <span>{props.message.text}</span>
            </div>
        </div>
    )
}
