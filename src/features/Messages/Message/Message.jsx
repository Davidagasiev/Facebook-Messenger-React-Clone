import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";

import "./Message.scss";
import { UsersSelector } from "../../Users/UsersSlice";
import { CurrentUserSelector } from "../../Users/CurrentUserSlice";
import { Avatar } from '@material-ui/core';

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

    return (
        <div className={`Message ${currentUser.uid === thisUser.uid ? "current_user_is_author" : "other_user_is_author"}`}>
            {currentUser.uid === thisUser.uid ? "" : <Avatar src={thisUser.photoURL}/>
            }
            <div className="Message_text">   
                <span>{props.message.text}</span>
            </div>
        </div>
    )
}
