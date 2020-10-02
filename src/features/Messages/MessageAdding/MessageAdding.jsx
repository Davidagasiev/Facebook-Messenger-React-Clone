import React, { useState } from 'react'
import { useSelector } from "react-redux";

import "./MessageAdding.scss";
import {AddMessage, handlePhotoChange, AddPhotoMessage, handleFileChange, AddFileMessage} from "./Functions";

import {CurrentUserSelector} from "../../Users/CurrentUserSlice";
import useInput from "../../../Hooks/useInput";
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PhotoIcon from '@material-ui/icons/Photo';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DescriptionIcon from '@material-ui/icons/Description';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Popover from '@material-ui/core/Popover';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default function MessageAdding(props) {

    const [ message, handleMessageChange ] = useState("");
    const currentUser = useSelector(CurrentUserSelector);

// For photo message

    const [upload, setUpload] = useState(null);
    const [chosenFile, setChosenFile] = useState("");
    const [sendDisabled, setSendDisabled] = useState(false);

// For file message

const [uploadFile, setUploadFile] = useState(null);

// For Emoji

const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

    return (
        <div 
            className="MessageAdding" 
            style={{borderTop: chosenFile !== "" || uploadFile !== null ? "1px solid lightgrey": "none"}}>
        
        
        {chosenFile !== "" ?       
            <div className="chosenPhotoFile" style={{backgroundImage: `url(${chosenFile})`}}>
            </div>
            :
            uploadFile !== null ?
                <div className="chosenFile" style={{backgroundImage: `url(${chosenFile})`}}>
                    <div className="fileIcon">
                        <DescriptionIcon />
                    </div>
                    <div className="chosenFileDescription">
                        <p>{uploadFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                            "application/docx":

                                uploadFile.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ?
                                    "application/pptx"
                                : 
                                    uploadFile.type
                        }</p>
                        <span>{ uploadFile.name.length > 20 ?
                                    `${uploadFile.name.slice(0, 20)}...`
                                :
                                    uploadFile.name
                            }</span>
                    </div>
                </div>
            :
                ""
        }
                <form onSubmit={(e) => {
                    e.preventDefault(); 
                    if(chosenFile !== ""){
                        AddPhotoMessage(upload, setUpload, setChosenFile, currentUser.uid, props.groupId, setSendDisabled);
                    }
                    else if(uploadFile !== null){
                        AddFileMessage(uploadFile, setUploadFile, currentUser.uid, props.groupId, setSendDisabled);
                    }else if(chosenFile === "" && uploadFile === null){
                        AddMessage(message, handleMessageChange, currentUser.uid, props.groupId);
                    }
                    }}>    
{/* For file  */}
                    <input
                        accept=".doc, .pdf, .docx, .pptx"
                        id="fileMessage"
                        className="fileInput"
                        type="file"
                        onChange={(e) => {
                            handleFileChange(e, setUploadFile);
                        }}
                    />
    
                    { props.isGroup ?
                        
                        <label title="Send A File" htmlFor="fileMessage">
                            <InsertDriveFileIcon />
                        </label>
                        
                        :
                        <div style={{padding: "12px"}} className="messagingDisabled">
                            <div>
                                <InsertDriveFileIcon /> 
                            </div>
                        </div>
                    }
{/* For file  */}

{/* For Image  */}
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
                        
                        <label title="Send A Photo" htmlFor="photoMessage">
                            <PhotoIcon />
                        </label>
                        
                        :
                        <div style={{padding: "12px"}} className="messagingDisabled">
                            <div>
                                <PhotoIcon /> 
                            </div>
                        </div>
                    }
{/* For Image  */}

                    <input type="text" autoFocus placeholder="Type a message..." onChange={e => handleMessageChange(e.target.value)} value={message}/>
                    
                    { props.isGroup ?
                        
                        <div title="Send An Emoji" onClick={handleClick}>
                            <EmojiEmotionsIcon/>
                        </div>
                        
                        :
                        <div style={{padding: "12px"}} className="messagingDisabled">
                            <div>
                                <EmojiEmotionsIcon /> 
                            </div>
                        </div>
                    }
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                            >
                                <Picker onSelect={emoji => handleMessageChange(message + emoji.native)} />
                            </Popover>
                    { props.isGroup && !sendDisabled ?
                    <IconButton title="Send A Message" type="submit">
                        <SendIcon />
                    </IconButton>
                        :
                    <div className="messagingDisabled">
                        <IconButton title="Send A Message" type="submit" disabled>
                            <SendIcon />
                        </IconButton>
                    </div>
                    }
                </form>
        </div>
    )
}
