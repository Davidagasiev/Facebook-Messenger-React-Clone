import React, { useState } from 'react'
import { useSelector } from "react-redux";

import "./MessageAdding.scss";
import {AddMessage, handlePhotoChange, AddPhotoMessage} from "./Functions";

import {CurrentUserSelector} from "../../Users/CurrentUserSlice";
import useInput from "../../../Hooks/useInput";
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PhotoIcon from '@material-ui/icons/Photo';

export default function MessageAdding(props) {

    const [ message, handleMessageChange, resetMessage ] = useInput("");
    const currentUser = useSelector(CurrentUserSelector);

// For photo message

    const [upload, setUpload] = useState(null);
    const [chosenFile, setChosenFile] = useState("");
    const [sendDisabled, setSendDisabled] = useState(false);

    return (
        <div className="MessageAdding">
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    if(chosenFile === ""){
                        AddMessage(message, resetMessage, currentUser.uid, props.groupId);
                    }
                    else{
                        AddPhotoMessage(upload, setUpload, setChosenFile, currentUser.uid, props.groupId, setSendDisabled);
                    }
                    }}>    

                    <input
                        accept="image/*"
                        id="photoMessage"
                        className="fileInput"
                        type="file"
                        onChange={(e) => {
                            handlePhotoChange(e, setUpload, setChosenFile);
                        }}
                    />
    
                    { props.isGroup ?
                        
                        <label  htmlFor="photoMessage">
                            <PhotoIcon />
                        </label>
                        
                        :
                        <div style={{padding: "12px"}} className="messagingDisabled">
                            <div>
                                <PhotoIcon /> 
                            </div>
                        </div>
                    }

                    <input type="text" autoFocus placeholder="Type a message..." onChange={handleMessageChange} value={message}/>
                    { props.isGroup && !sendDisabled ?
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
