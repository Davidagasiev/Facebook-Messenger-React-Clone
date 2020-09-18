import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import "./Main.scss";

import { db } from "../../app/firebase";
import {MessageSelector, updateMessages} from "../Messages/MessagesSlice";

import MessageList from "../Messages/MessageList/MessageList.jsx";
import MessageAdding from "../Messages/MessageAdding/MessageAdding";
import Navbar from "../Navbar/Navbar.jsx";
import Welcome from '../Welcome/Welcome';

import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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

// For Got To bottom button. 
      const [showToBottom, setShowToButton] = useState(true);

      const listenToScroll = () => {
        if(window.innerHeight + 400 < document.body.clientHeight - window.pageYOffset){
          setShowToButton(true);
        }else{
          setShowToButton(false);
        }
      }
      
      useEffect(() => {
        window.addEventListener('scroll', listenToScroll)

        return () => {
          window.removeEventListener('scroll', listenToScroll);
        }
      })


    return (
        <>
          <Navbar />
          <div className="Main">
              <Welcome style={{marginTop: "100px"}}/>
              <MessageList messages={messages} />
          </div>
          { showToBottom ?
                <div className="toBottom">
                    <div>
                        <IconButton onClick={() => window.scrollTo(0, document.body.clientHeight)} size="medium">
                            <ArrowDownwardIcon fontSize="inherit" />
                        </IconButton> 
                    </div>
                </div>
                : ""
            }
          <MessageAdding />
        </>
    )
}
