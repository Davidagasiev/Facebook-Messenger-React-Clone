import React from 'react'
import { Link } from 'react-router-dom';

import { Avatar, IconButton } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import "./Group.scss";
import { useSelector } from 'react-redux';
import { MessageSelector } from '../../Messages/MessagesSlice';
import MergeSort from "../../../Hooks/MergeSort";

export default function Group(props) {

    const messages = useSelector(MessageSelector);

    const lastMessage = MergeSort(messages.filter(message => message.GId === props.id));
    return (
        <div className={`Group ${props.id === props.groupId ? "activeGroup" : "" }`}>
            <Link to={`/Groups/${props.id}`}>
                <div className="group">
                    <Avatar src={props.GImage}/>
                    <div>
                        <p>{
                            props.GName.length > 15 ?
                                props.GName.slice(0, 15) + "..."
                                :
                                props.GName
                                }</p>
                        <span>{
                            lastMessage.length > 0 ? 
                            lastMessage[lastMessage.length - 1].text
                            :
                            "No Messages"
                            }</span>
                    </div>
                </div>
            </Link>
            <div className="group_IconButton">
                <IconButton>
                    <MoreHorizIcon />
                </IconButton>
            </div>
        </div>
    )
}
