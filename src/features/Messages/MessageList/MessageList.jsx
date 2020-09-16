import React from 'react'

import Message from '../Message/Message.jsx'
import "./MessageList.scss";

export default function MessageList(props) {
    return (
        <div className="MessageList">
            {props.messages.map(message => (
                <Message message={message}/>
            ))
            }
        </div>
    )
}
