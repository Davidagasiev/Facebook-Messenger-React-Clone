import React from 'react'
import { useSelector } from "react-redux";

import "./MessageAdding.scss";
import AddMessage from "./Functions";

import {CurrentUserSelector} from "../../Users/CurrentUserSlice";
import useInput from "../../../Hooks/useInput";

export default function MessageAdding() {

    const [ message, handleMessageChange, resetMessage ] = useInput("");
    const currentUser = useSelector(CurrentUserSelector);

    return (
        <div className="MessageAdding">
            <form onSubmit={(e) => {
                e.preventDefault(); 
                AddMessage(message, resetMessage, currentUser);
                }}>    
                <input type="text" placeholder="Type a message..." onChange={handleMessageChange} value={message}/>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
