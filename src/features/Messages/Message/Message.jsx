import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";

import "./Message.scss";
import { UsersSelector } from "../../Users/UsersSlice";

export default function Message(props) {
    const message = props.message;
    const users = useSelector(UsersSelector);

    const [thisUser, setThisUser] = useState({});

    useEffect(() => {
        if(users.length !== 0){
            setThisUser(users.find(user => user.uid === message.uid))
        }
    }, [users])

    return (
        <div>
            <div>
                <span>{props.message.text}</span>
            </div>
        </div>
    )
}
