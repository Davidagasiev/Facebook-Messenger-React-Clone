import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MessageSelector } from '../../../Messages/MessagesSlice';
import mergeSort from "../../../../Hooks/MergeSort";

import "./GroupFiles.scss";

export default function GroupFiles(props) {

    const messages = mergeSort(useSelector(MessageSelector)
            .filter(message => message.GId === props.groupId && message.type === "file")).reverse();

    return (
        <div className="GroupFiles">
            <p>SHARED FILES</p>
            {messages.length === 0 ?
                <span>No Files</span>
                
                :

                <div className="Files">
                    {messages.map(message => 
                        <a className="file" href={message.file} key={message.id} target="_blank">
                            {
                                `${message.fileName.slice(0, 30)}${message.fileName.length > 30 ? "..." : ""}`
                            }
                        </a>
                        )
                    }
                </div>
            }
        </div>
    )
}
