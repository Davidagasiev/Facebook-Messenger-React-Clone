import React from 'react'

import Message from '../Message/Message.jsx'
import "./MessageList.scss";
import { mergeSort } from "./Functions";


export default function MessageList(props) {

    const messages = mergeSort(props.messages);

    return (
        <>
        <div className="MessageList">
            {messages.map(message => (
                <Message key={message.id} message={message}/>
            ))
            }
        </div>
        </>
    )
}
