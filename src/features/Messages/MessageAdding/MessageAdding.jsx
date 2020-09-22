import React from 'react'
import { useSelector } from "react-redux";

import "./MessageAdding.scss";
import AddMessage from "./Functions";

import {CurrentUserSelector} from "../../Users/CurrentUserSlice";
import useInput from "../../../Hooks/useInput";
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PhotoIcon from '@material-ui/icons/Photo';

export default function MessageAdding(props) {

    const [ message, handleMessageChange, resetMessage ] = useInput("");
    const currentUser = useSelector(CurrentUserSelector);

    return (
        <div className="MessageAdding">
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    AddMessage(message, resetMessage, currentUser.uid, props.groupId);
                    }}>    

                    { props.isGroup ?
                    <IconButton type="submit">
                        <PhotoIcon />
                    </IconButton>
                        :
                    <div className="messagingDisabled">
                        <IconButton disabled>
                            <PhotoIcon />
                        </IconButton>
                    </div>
                    }

                    <input type="text" autoFocus placeholder="Type a message..." onChange={handleMessageChange} value={message}/>
                    { props.isGroup ?
                    <IconButton type="submit">
                        <SendIcon />
                    </IconButton>
                        :
                    <div className="messagingDisabled">
                        <IconButton type="submit" disabled>
                            <SendIcon />
                        </IconButton>
                    </div>
                    }
                </form>
        </div>
    )
}
