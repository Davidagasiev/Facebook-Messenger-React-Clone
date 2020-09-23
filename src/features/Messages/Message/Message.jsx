import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";

import {createDate, deleteMessage} from "./Functions";
import "./Message.scss";
import { UsersSelector } from "../../Users/UsersSlice";
import { CurrentUserSelector } from "../../Users/CurrentUserSlice";
import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


export default function Message(props) {
    const message = props.message;
    const users = useSelector(UsersSelector);
    const curUser = useSelector(CurrentUserSelector);

    const [thisUser, setThisUser] = useState({});
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if(users.length !== 0){
            setThisUser(users.find(user => user.uid === message.uid))
        }
        if(curUser !== null){
            setCurrentUser(curUser);
        }
    }, [users])

// For message menu

const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div className={`Message ${currentUser.uid === thisUser.uid ? "CUIA" : ""}`}>
            <div className={currentUser.uid === thisUser.uid ? "current_user_is_author" : "other_user_is_author"}>
                {
                    currentUser.uid === thisUser.uid ? "" : <Avatar src={thisUser.photoURL}/>
                }

                {props.message.type !== "photo" ?
                <div className="Message_text" title={createDate(props.message.date)}>
                        <span>{props.message.text}</span>
                        
                </div>
                    :
                <img alt="Message" className="Message_Image" src={props.message.photo}/>
                }
            </div>
            <IconButton onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => deleteMessage(props.message.id, handleClose)}>Remove</MenuItem>
            </Menu>

        </div>
    )
}
