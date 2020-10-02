import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import "./Chat.scss";

import MessageList from "../Messages/MessageList/MessageList.jsx";
import MessageAdding from "../Messages/MessageAdding/MessageAdding";
import Navbar from "../Navbar/Navbar.jsx";
import Welcome from '../Welcome/Welcome';

import { IconButton } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { GroupsSelector } from '../Groups/GroupsSlice';

export default function Chat(props) {
// For Got To bottom button. 
      // const [showToBottom, setShowToButton] = useState(true);
      // const main = document.getElementsByClassName("main")[0];
      // const listenToScroll = () => {
        
      //   if(main.scrollHeight - 400 >  main.scrollTop + main.offsetHeight){
      //     setShowToButton(true);
      //   }else{
      //     setShowToButton(false);
      //   }
      // }
      
      // useEffect(() => {
      //   const main = document.getElementsByClassName("main")[0];
      //     main.addEventListener('scroll', listenToScroll)

      //   return () => {
      //     main.removeEventListener('scroll', listenToScroll);
      //   }
      // })

    const groups = useSelector(GroupsSelector);
    const [curGroup, setCurGroup] = useState({});

    useEffect(() => {
        if(groups.length !== 0) {
            setCurGroup(groups.find(group => group.id === props.groupId));
        }
    }, [groups])

    return (
      <>
          <div className="Chat">
              { props.isGroup ? 
                <>
                  <div className="chat">
                      <Welcome type="group" h1={curGroup.GName} src={curGroup.GImage} style={{marginTop: "100px"}}/>
                      <MessageList messages={props.messages} />
                  </div>
                  
                  <Navbar darkMode={props.darkMode} groupId={props.groupId}/>
                </>
                : ""
              }
            <MessageAdding isGroup={props.isGroup} groupId={props.groupId}/>
          </div>
      </>
    )
}
