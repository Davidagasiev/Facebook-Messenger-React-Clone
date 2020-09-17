import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import { Avatar, Divider, IconButton, Menu, MenuItem} from '@material-ui/core';

import {CurrentUserSelector} from "../Users/CurrentUserSlice";

import "./Navbar.scss";
import { auth } from '../../app/firebase';
import { UsersSelector } from '../Users/UsersSlice';

export default function Navbar() {

    const users = useSelector(UsersSelector);
    const curUser = useSelector(CurrentUserSelector);

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if(users.length !== 0 && curUser !== null){
            setCurrentUser(users.find(user => user.uid === curUser.uid))
        }
    }, [users, curUser])

    
// For User Menu

const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <div className="Navbar">
            <div className="navbar">
                <div className="leftBar">
                    <Avatar src={currentUser.photoURL} onClick={handleClick}/>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                            <Divider />
                            <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
                        </Menu>
                    <span>{currentUser.displayName}</span>
                </div>
                <div className="rightBar">
                    <IconButton style={{padding: "5px"}}>
                        <svg height="32px" width="32px" viewBox="0 0 36 36"><g id="info-circle" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g id="Group"><polygon id="Fill-8" points="0 36 36 36 36 0 0 0"></polygon><path id="Fill-17" d="M18,10 C16.6195,10 15.5,11.119 15.5,12.5 C15.5,13.881 16.6195,15 18,15 C19.381,15 20.5,13.881 20.5,12.5 C20.5,11.119 19.381,10 18,10 Z M16,25 C16,25.552 16.448,26 17,26 L19,26 C19.552,26 20,25.552 20,25 L20,18 C20,17.448 19.552,17 19,17 L17,17 C16.448,17 16,17.448 16,18 L16,25 Z M18,30 C11.3725,30 6,24.6275 6,18 C6,11.3725 11.3725,6 18,6 C24.6275,6 30,11.3725 30,18 C30,24.6275 24.6275,30 18,30 Z" fill="#0099ff"></path></g></g></svg>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
