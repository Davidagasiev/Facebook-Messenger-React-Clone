import React from 'react'
import { useSelector } from "react-redux";

import "./MessageAdding.scss";
import AddMessage from "./Functions";

import {CurrentUserSelector} from "../../Users/CurrentUserSlice";
import useInput from "../../../Hooks/useInput";
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PhotoIcon from '@material-ui/icons/Photo';

export default function MessageAdding() {

    const [ message, handleMessageChange, resetMessage ] = useInput("");
    const currentUser = useSelector(CurrentUserSelector);

    return (
        <div className="MessageAdding">
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    AddMessage(message, resetMessage, currentUser.uid);
                    }}>    

                    <IconButton>
                        <PhotoIcon />
                    </IconButton>
                
                    <input type="text" autoFocus placeholder="Type a message..." onChange={handleMessageChange} value={message}/>
                    <IconButton type="submit" aria-label="delete">
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}
