import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { db } from "../../app/firebase";
import { MessageSelector, updateMessages } from "../Messages/MessagesSlice";
import { GroupsSelector, updateGroups } from "../Groups/GroupsSlice.js";

import Chat from '../Chat/Chat.jsx'
import Groups from '../Groups/Groups.jsx'

export default function Main(props) {
     

    const dispatch = useDispatch();
    const messages = useSelector(MessageSelector);

    useEffect(() =>{
        //This is how to get info from firebase
          db.collection("messages").onSnapshot(snapshot => {
            dispatch(updateMessages( snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
          })

          db.collection("groups").onSnapshot(snapshot => {
            dispatch(updateGroups( snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
          })
      }, [])

    const groupId = props.match.params.GroupId;
    const groupMessages = messages.filter(message => message.GId === groupId);
    const groups = useSelector(GroupsSelector);

  return (
    <div className="Main">
        <Groups groupId={groupId}/>
        <Chat 
          groupId={groupId} 
          messages={groupMessages} 
          isGroup={groups.find(group => group.id === groupId) === undefined ? false : true}/>
    </div>
  )
}
