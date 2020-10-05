import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MessageSelector } from '../../../Messages/MessagesSlice';
import mergeSort from "../../../../Hooks/MergeSort";

import "./GroupImages.scss";

export default function GroupImages(props) {

    const messages = mergeSort(useSelector(MessageSelector)
            .filter(message => message.GId === props.groupId && message.type === "photo")).reverse();

    return (
        <div className="GroupImages">
            <p>SHARED PHOTOS</p>

            {messages.length === 0 ?
                <span>No Photos</span>
                    :
                <div className="Images">
                    {messages.map(message => 
                            <a href={message.photo} key={message.id} target="_blank">
                                <div style={{backgroundImage: `url(${message.photo})`}} className="GroupImages_Item"></div>
                            </a>
                        )
                    }
                </div>
            }
        </div>
    )
}
