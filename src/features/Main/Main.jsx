import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import "./Main.scss";

import { db, auth } from "../../app/firebase";
import {MessageSelector, updateMessages} from "../Messages/MessagesSlice";

import MessageList from "../Messages/MessageList/MessageList.jsx";
import MessageAdding from "../Messages/MessageAdding/MessageAdding";
import Navbar from "../Navbar/Navbar.jsx";
import Welcome from '../Welcome/Welcome';

export default function Main() {

    const dispatch = useDispatch();
    const messages = useSelector(MessageSelector);
    // const currentUser = useSelector(CurrentUserSelector);
    useEffect(() =>{
        //This is how to get info from firebase
          db.collection("messages").onSnapshot(snapshot => {
            dispatch(updateMessages( snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
          })
      }, [])

    return (
        <>
          <Navbar />
          <div className="Main">
              <Welcome style={{marginTop: "100px"}}/>
              <MessageList messages={messages} />
          </div>
          <MessageAdding />
        </>
    )
}
